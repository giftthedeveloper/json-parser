var Lexer = /** @class */ (function () {
    function Lexer(input) {
        this.position = 0;
        this.input = input;
    }
    // Function to get all input characters
    Lexer.prototype.getallcharacters = function () {
        if (this.position < this.input.length) {
            return this.input[this.position++];
        }
        else {
            return null;
        }
    };
    // Function to convert the input characters to an array of tokens for efficiency 
    Lexer.prototype.tokenize = function () {
        var tokens = [];
        var currentToken = '';
        while (true) {
            var character = this.getallcharacters();
            if (character === '{') {
                tokens.push('{');
            }
            else if (character === '}') {
                tokens.push('}');
            }
            else if (character === '"') {
                currentToken += character;
                while (true) {
                    var char = this.getallcharacters();
                    if (char === '"') {
                        currentToken += char;
                        tokens.push(currentToken);
                        currentToken = '';
                        break;
                    }
                    else if (char === null) {
                        console.error('String not terminated');
                        process.exit(1);
                    }
                    else {
                        currentToken += char;
                    }
                }
            }
            else if (character === ':') {
                tokens.push(':');
            }
            else if (character === ',') {
                tokens.push(',');
            }
            else if (character == null) {
                break;
            }
            else if (!/\s/.test(character)) {
                console.error("Invalid character: ".concat(character));
                process.exit(1);
            }
        }
        return tokens;
    };
    return Lexer;
}());
var input = process.argv[2];
var lexer = new Lexer(input);
var tokens = lexer.tokenize();
console.log(tokens);
var Parser = /** @class */ (function () {
    function Parser(tokens) {
        this.currentTokenIndex = 0;
        this.tokens = tokens || [];
    }
    Parser.prototype.parse = function () {
        if (this.tokens.length == 0) {
            console.log('Valid json object');
        }
        else {
            // Tokenize based on how JSON is expected to be written, e.g., it should start with double quote, colon for key-value pair
            if (this.tokens[0] === '{') {
                this.tokens.shift();
                while (this.tokens.length > 0) {
                    if (this.tokens[0].startsWith('"')) {
                        var key = this.tokens.shift();
                        if (this.tokens.shift() === ':') {
                            if (this.tokens[0].startsWith('"')) {
                                var value = this.tokens.shift();
                                if (value != undefined && value.endsWith('"')) {
                                    console.log("Valid JSON object");
                                    return;
                                }
                                else if (this.tokens.shift() === ',') {
                                    continue;
                                }
                            }
                        }
                    }
                    console.error("Invalid JSON object");
                    process.exit(1);
                }
            }
            else {
                console.log('Invalid JSON object');
                process.exit(1);
            }
        }
    };
    return Parser;
}());
var parser = new Parser(tokens);
parser.parse();
