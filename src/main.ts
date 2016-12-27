const INTEGER = "INTEGER";
const PLUS = "PLUS";
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

	constructor(
		public text: string
	) {}

	error() {
		throw Error(`Error parsing input`);
	}

	getNextToken() {
		if (this.pos > this.text.length - 1) {
			return new Token(EOF, null)
		}

		const currentChar = this.text.charAt(this.pos)
		
		const num: number = Number.parseInt(currentChar);
		const isNum: boolean = !Number.isNaN(num);

		if (isNum) {
			const token = new Token(INTEGER, Number(currentChar));
			this.pos += 1;
			return token;
		}

		if (currentChar === '+') {
			const token = new Token(PLUS, currentChar);
			this.pos += 1;
			return token;
		}

		this.error();
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

		// current token should be a "+"
		const op = this.currentToken;
		this.eat(PLUS);

		// current token should be a single-digit integer
		const right = this.currentToken;
		this.eat(INTEGER);
 
		return left.value + right.value;
	}

}

function main() {

	const interpreter = new Interpreter('1+5');
	const result = interpreter.expr()
	console.log(result);


	// prompt('calc> ', (userInput) => {
	// 	console.log("User input: ", userInput);

	// 	const interpreter = new Interpreter(userInput);
	// 	const result = interpreter.expr()
	// 	console.log(result);
	// 	process.exit()
	// })
	
}

// function prompt(text, cb) {
// 	let stdin = process.stdin;
// 	let stdout = process.stdout;

// 	stdin.resume();
// 	stdout.write(text);

// 	stdin.once('data', (data) => {
// 		cb(data.toString().trim());
// 	})
// }

main()