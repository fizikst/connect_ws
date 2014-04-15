var exec = require('child_process').exec, child;


while(1) {

    if (detect()) {

    } else {

    }

}

function detect() {
    child = exec('ping -c 1 127.0.0.1', function(error, stdout, stderr){
        if(error !== null)
            return false;
        else
            return true;
    });
}