class Lexer {
    private input: string;
    private position: number = 0;

    constructor(input: string) {
        this.input = input
    }

    // Function to get all input characters
    private getallcharacters(): string | null {
        if (this.position < this.input.length) {
            return this.input[this.position++];
        } else {
            return null;
        }
    }

    // Function to convert the input characters to an array of tokens for efficiency 
    tokenize(): string[] {
        const tokens: string[] = [];
        let currentToken = '';

        while (true) {
            const character = this.getallcharacters();

            if (character === '{') {
                tokens.push('{');
            } else if (character === '}') {
                tokens.push('}');
            } else if (character === '"') {
                currentToken += character;
                while (true) {
                    const char = this.getallcharacters();
                    if (char === '"') {
                        currentToken += char;
                        tokens.push(currentToken);
                        currentToken = '';
                        break;
                    } else if (char === null) {
                        console.error('String not terminated');
                        process.exit(1);
                    } else {
                        currentToken += char;
                    }
                }
            } else if (character === ':') {
                tokens.push(':');
            } else if (character === ',') {
                tokens.push(',');
            } else if (character == null) {
                break;
            } else if (!/\s/.test(character)) {
                console.error(`Invalid character: ${character}`);
                process.exit(1);
            }
        }

        return tokens;
    }
}


const input = process.argv[2];
const lexer = new Lexer(input);
const tokens = lexer.tokenize();

console.log(tokens)


class Parser {
    private tokens: string[];
    private currentTokenIndex: number = 0;

    constructor(tokens: string[]) {
        this.tokens = tokens || [];
    }

    parse (): void {
        if (this.tokens.length == 0) {
            console.log('Valid json object');
        } else {
            // Tokenize based on how JSON is expected to be written, e.g., it should start with double quote, colon for key-value pair
            if (this.tokens[0] === '{') {
                this.tokens.shift();

                while (this.tokens.length > 0) {
                    if (this.tokens[0].startsWith('"')) {
                        const key = this.tokens.shift();

                        if (this.tokens.shift() === ':') {
                            if (this.tokens[0].startsWith('"')) {
                                const value = this.tokens.shift();
                                if (value != undefined && value.endsWith('"')) {
                                    console.log("Valid JSON object");
                                    return;
                                } else if (this.tokens.shift() === ',') {
                                    continue;
                                }
                            }
                        }
                    }
                    console.error("Invalid JSON object");
                    process.exit(1);
                }
            } else {
                console.log('Invalid JSON object');
                process.exit(1);
            }
        }
    }
}

        
    const parser = new Parser(tokens);
    parser.parse();