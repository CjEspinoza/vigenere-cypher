
var Vigenere = (function(){
    var AcharCode = 'A'.charCodeAt(0);
    var ZcharCode = 'Z'.charCodeAt(0);
    var AZlen = ZcharCode - AcharCode + 1;
    
    function encrypt( text, key, reverse, keepspaces ){    
      var textToEncrypt = keepspaces ? text : text.replace( /\s+/g, '' );
      var messageLen = textToEncrypt.length;
      var keyLen = key.length;
      var enctext = '';
      var encryptionDir = reverse ? ( -1 * AZlen ) : 0;
      
      for( var i = 0; i < messageLen; i++ ){
        var plainLetter = textToEncrypt.charAt(i).toUpperCase();
        if( plainLetter.match(/\s/) ){
          enctext += plainLetter;
          continue;
        }
        
        var keyLetter = key.charAt( i % keyLen ).toUpperCase();
        var vigenereOffset = keyLetter.charCodeAt(0) - AcharCode;
        var encLetterOffset =  ( plainLetter.charCodeAt(0) - AcharCode + Math.abs( encryptionDir + vigenereOffset ) ) % AZlen;
        
        enctext +=  String.fromCharCode( AcharCode + encLetterOffset );          
      }  
      
      return enctext;
    }
    
    return {
      encrypt : function( text, key,keepspaces ){
        return encrypt( text, key, false, keepspaces );
      },
      
      decrypt : function( text, key, keepspaces ){
        return encrypt( text, key, true, keepspaces );
      }
    };  
  })();

  (function(){
    var $key = document.getElementById('key');
    var $textToEncrypt = document.getElementById('textToEncrypt');
    var $encryptedtext = document.getElementById('encryptedtext');
    
    var $btnEncrypt = document.getElementById('btn-encrypt');
    var $btnDecrypt = document.getElementById('btn-decrypt');
    
    
    $btnEncrypt.addEventListener( 'click', function(){
      var text = Vigenere.encrypt( $textToEncrypt.value, $key.value , true );
      $encryptedtext.value = text;
    });
    
    $btnDecrypt.addEventListener( 'click', function(){
      var text = Vigenere.decrypt( $encryptedtext.value, $key.value , true );
      $textToEncrypt.value = text;
    });
  })();

  function darkMode(){
    var element = document.body;
    element.classList.toggle("dark-mode");
  }