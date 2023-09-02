var Lexer = /** @class */ (function () {
    function Lexer(input) {
        this.position = 0;
        this.input = input;
    }
    //function to get all input characters
    Lexer.prototype.getallcharacters = function () {
        if (this.position < this.input.length) {
            return this.input[this.position++];
        }
        else {
            return null;
        }
    };
    //function to convert the input characters to an array of tokens for efficiency 
    Lexer.prototype.tokenize = function () {
        var tokens = [];
        var currenttoken = '';
        while (true) {
            var character = this.getallcharacters();
            if (character === '{') {
                tokens.push('{');
            }
            else if (character === '}') {
                tokens.push('}');
            }
            else if (character === null) {
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
        this.tokens = tokens;
    }
    Parser.prototype.parse = function () {
        if (this.tokens.length == 0) {
            console.log('valid json object');
        }
        else {
            console.log('invalid json object');
            process.exit(1);
        }
    };
    return Parser;
}());
var parser = new Parser(tokens);
parser.parse();
