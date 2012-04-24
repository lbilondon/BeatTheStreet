var newHighScore;
var readHighScore;
var ReadWriteHighScore = (function () {
 
    function writetofile ()
    {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, writeFS, fail);         
    }
                          
    function readfile ()
    {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, readFS, fail);         
    }
                 
    function writeFS(fileSystem) {
        fileSystem.root.getFile("HighScore.txt", {create: true, exclusive: false}, gotFileEntry, fail);
    }
                 
    function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
        //console.log(fileEntry);
    }
                 
    function gotFileWriter(writer) {
        writer.write(""+newHighScore);
    }
                
    function readFS(fileSystem) {
        fileSystem.root.getFile("HighScore.txt", {create: true, exclusive: false}, gotReadFileEntry, fail);
    }
                 
    function gotReadFileEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
        //console.log(fileEntry);
    }
    function setHighScore (score)
    {
        newHighScore = score;
    }
                          
    function gotFile(file){
        readAsText(file);
    }
                 
    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
                console.log("Reading from text file");

                if (!(evt.target.result)) {
                    readHighScore = 0;
                }
                else 
                    readHighScore = evt.target.result;
                startTheGame(readHighScore);
            };
        reader.readAsText(file);
    }
                
    function fail(evt) {
        console.log(evt.target.error.code);
    }
    
    return {
        writetofile: function () {
            writetofile();
        },
        setHighScore : function (score)
        {
            setHighScore(score);
        },
        readfile : function () {
            readfile();
        },
        getHighScore : function (){
            readfile();
        }
       
    }
})();


