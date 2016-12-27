const INTEGER = "INTEGER";
const PLUS = "PLUS";
const EOF = "EOF";
class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
    toString() {
        return `Token(${this.type}, ${this.value})`;
    }
}
class Interpreter {
    constructor(text) {
        this.text = text;
        this.pos = 0;
        this.currentToken = null;
    }
    error() {
        throw Error(`Error parsing input`);
    }
    getNextToken() {
        if (this.pos > this.text.length - 1) {
            return new Token(EOF, null);
        }
        const currentChar = this.text.charAt(this.pos);
        const num = Number.parseInt(currentChar);
        const isNum = !Number.isNaN(num);
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
    eat(tokenType) {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.getNextToken();
        }
        else
            this.error();
    }
    expr() {
        this.currentToken = this.getNextToken();
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
    const result = interpreter.expr();
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
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQztBQUMxQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUM7QUFDcEIsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDO0FBRWxCO0lBQ0MsWUFDUSxJQUFZLEVBQ1osS0FBVTtRQURWLFNBQUksR0FBSixJQUFJLENBQVE7UUFDWixVQUFLLEdBQUwsS0FBSyxDQUFLO0lBQ2YsQ0FBQztJQUVKLFFBQVE7UUFDUCxNQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQztJQUM3QyxDQUFDO0FBR0YsQ0FBQztBQUVEO0lBSUMsWUFDUSxJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQUpiLFFBQUcsR0FBVyxDQUFDLENBQUM7UUFDaEIsaUJBQVksR0FBVSxJQUFJLENBQUM7SUFJL0IsQ0FBQztJQUVKLEtBQUs7UUFDSixNQUFNLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxZQUFZO1FBQ1gsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDNUIsQ0FBQztRQUVELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUU5QyxNQUFNLEdBQUcsR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sS0FBSyxHQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUUxQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ2QsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNkLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2QsQ0FBQztRQUVELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNkLENBQUM7SUFFRCxHQUFHLENBQUMsU0FBaUI7UUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUN4QyxDQUFDO1FBQUMsSUFBSTtZQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBSTtRQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO1FBRXZDLGlEQUFpRDtRQUNqRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEIsZ0NBQWdDO1FBQ2hDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVmLGlEQUFpRDtRQUNqRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDO0FBRUYsQ0FBQztBQUVEO0lBRUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFHcEIsb0NBQW9DO0lBQ3BDLDJDQUEyQztJQUUzQyxtREFBbUQ7SUFDbkQscUNBQXFDO0lBQ3JDLHdCQUF3QjtJQUN4QixrQkFBa0I7SUFDbEIsS0FBSztBQUVOLENBQUM7QUFFRCw4QkFBOEI7QUFDOUIsOEJBQThCO0FBQzlCLGdDQUFnQztBQUVoQyxtQkFBbUI7QUFDbkIsdUJBQXVCO0FBRXZCLGtDQUFrQztBQUNsQyxnQ0FBZ0M7QUFDaEMsTUFBTTtBQUNOLElBQUk7QUFFSixJQUFJLEVBQUUsQ0FBQSJ9