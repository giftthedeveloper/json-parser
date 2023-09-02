class Lexer {
    private input: string;
    private position: number = 0;

    constructor(input: string) {
        this.input = input
    }

    //function to get all input characters
    private getallcharacters(): string | null {
        if (this.position < this.input.length) {
            return this.input[this.position++]
        }
        else {
            return null
        }
    }

    //function to convert the input characters to an array of tokens for efficiency 
    tokenize(): string[] {
        const tokens: string [] = []
        let currenttoken = '';

        while (true) {
            const character = this.getallcharacters();

            if (character === '{') {
                tokens.push('{');
            } else if (character === '}') {
                tokens.push('}')
            } else if (character === null) {
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


class Parser{
    private tokens: string[];
    private currentTokenIndex: number=0;

    constructor(tokens: string[]) {
        this.tokens = tokens;
    }

    parse (): void {
        if (this.tokens.length == 0) {
            console.log('valid json object');
        } else {
            console.log('invalid json object');
            process.exit(1)
        }
    }
}

const parser = new Parser(tokens);
parser.parse();