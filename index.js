
    function decrypt() {
      var cipher = document.getElementById("encrypted-text").innerHTML
      var key = document.getElementById("key").value
      console.log('cipher:',cipher)
      console.log('key:',key)

      var keyMatrix=parseKey(key)
      var cipherMatrix=parseText(cipher,key.length)
      console.log('cipherMatrix:',cipherMatrix)
      console.log('keyMatrix:',keyMatrix)

      var cipherLength = Object.keys(cipherMatrix).length
      var keyLength = Object.keys(keyMatrix).length
      var encrypt = []

      keyCopy = Object.assign({},keyMatrix)
      for (var i=1; i<=keyLength; i++) {
        keyMatrix[i] = findObjectPosition(keyCopy, i)
        console.log("obj", i, keyCopy, keyMatrix)
      }

      for (var i=0; i < cipherLength; i += keyLength) {
        console.log("i",i)
        for (j=1; j <= keyLength; j++) {
          console.log("j",j)
          encrypt[i+j] = cipherMatrix[i+keyMatrix[j]]
          console.log("encrypt",j+i, encrypt[i+j])
        }
      }

      console.log("plainText:",encrypt.join(''))
      document.getElementById("decrypted-text").innerHTML = encrypt.join('').toLowerCase()
    }

    function findObjectPosition(obj, elem) {
      for(i=1;i<=Object.keys(obj).length;i++)
        if( obj[i] == elem ) {
          console.log("iii",i)
          return i
        }
    }

    function encrypt(){
      var plainText = document.getElementById("plain-text").value
      var key = document.getElementById("key").value
      console.log('text:',plainText)
      console.log('key:',key)

      var keyMatrix=parseKey(key)
      var textMatrix=parseText(plainText,key.length)
      console.log('textMatrix:',textMatrix)
      console.log('keyMatrix:',keyMatrix)

      var textLength = Object.keys(textMatrix).length
      var keyLength = Object.keys(keyMatrix).length
      var encrypt = []

      for (i=0; i < textLength; i += keyLength) {
        console.log("i",i)
        for (j=1; j<=keyLength; j++) {
          console.log("j",j)
          encrypt[i+j] = textMatrix[i+keyMatrix[j]]
          console.log("encrypt",j+i, encrypt[i+j])
        }
      }

      console.log("cipher:",encrypt.join(''))
      document.getElementById("encrypted-text").innerHTML = encrypt.join('').toUpperCase()
      document.getElementById("decrypted-text").innerHTML = "blabla"
    }

    function parseKey(key){
      var arr={}
      var length=key.length
      key = parseInt(key)

      for (var i=length;i>0;i--) {
        arr[i]=parseInt(key%10)
        key=parseInt(key/10)
      }
      return arr
    }

    function parseText(text,n){
      var arr={}
      var length = text.length
      for (var i=length;i>0;i--) {
        arr[i]= text.slice(-1)
        text = text.substring(0, text.length-1);
      }

      //encryption key must be multiple of key length. if not complete with '_'
      if(length%n != 0){
        for(var i=length+1;i<=length+(n-(length%n));i++) {
          arr[i] = "_"
        }
      }
      return arr
    }
