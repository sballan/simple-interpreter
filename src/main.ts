const INTEGER = "INTEGER";
const PLUS = "PLUS";
const MINUS = "MINUS";
const EOF = "EOF";

class Token {
	constructor(
		public type: string,
		public value: any
	) {}

	toString() {
		return `Token(${this.type}, ${this.value})`;
	}


}

class Interpreter {
	public pos: number = 0;
	public currentToken: Token = null;
	public currentChar = this.text[this.pos];

	constructor(
		public text: string
	) {}

	error() {
		throw Error(`Error parsing input`);
	}

	advance() {
		this.pos += 1;

		if (this.pos > this.text.length - 1) {
			this.currentChar = null; // end of input
		} else {
			this.currentChar = this.text[this.pos];
		}

	}

	skipWhitespace() {
		while (this.currentChar !== null && this.currentChar === ' ') {
			this.advance();
		}
	}

	integer() {
		// parses a multidigit integer
		let result = '';

		while (this.currentChar !== null && !isNaN(Number(this.currentChar))) {
			result += this.currentChar;
			this.advance()
		}
		return Number(result);
	}

	getNextToken() {
		while (this.currentChar !== null) {
			if (this.currentChar === ' ') {
				this.skipWhitespace();
				continue;
			}

			if (!isNaN(Number(this.currentChar))) {
				return new Token(INTEGER, this.integer());
			}

			if (this.currentChar === '+') {
				this.advance();
				return new Token(PLUS, '+');
			}
			
			if (this.currentChar === '-') {
				this.advance();
				return new Token(MINUS, '-');
			}

			this.error()
		}

		return new Token(EOF, null);
	}

	eat(tokenType: string) {
		if (this.currentToken.type === tokenType) {
			this.currentToken = this.getNextToken()
		} else this.error();
	}

	expr() {
		this.currentToken = this.getNextToken()

		// current token should be a single-digit integer
		const left = this.currentToken;
		this.eat(INTEGER);

		// current token should be a "+" or a "-"
		const op = this.currentToken;
		if (op.type === PLUS) this.eat(PLUS);
		else this.eat(MINUS);

		// current token should be a single-digit integer
		const right = this.currentToken;
		this.eat(INTEGER);
 
		return op.type === PLUS
			? left.value + right.value
			: left.value - right.value
	}

}

function main() {

	prompt('calc> ', (userInput) => {
		const interpreter = new Interpreter(userInput);
		const result = interpreter.expr()
		console.log(result);
		process.exit()
	})
	
}

function prompt(text, cb) {
	let stdin = process.stdin;
	let stdout = process.stdout;

	stdin.resume();
	stdout.write(text);

	stdin.once('data', (data) => {
		cb(data.toString().trim());
	})
}

main()