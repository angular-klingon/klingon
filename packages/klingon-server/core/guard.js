/**
 * Validate shell command
 */
module.exports.isValidShellCommand = (command) => {

    // Invalid if it command is an empty string.
    if(!command) {
        return false;
    }

    const allowedCommands = ['cd','ls','clear','ll','l','git','npm'];

    /**
     * Do not allow command chaining
     */
    const regex = /[;&|$()<>]/gm;

    if(regex.test(command)) {
        return false;
    }

    commands = command.toLowerCase().split(' ');

    // Compare first word of command with alloweded command list (eg. cd /home => compare "cd" with allowed commands)
    return (allowedCommands.indexOf(commands[0]) > -1);
}