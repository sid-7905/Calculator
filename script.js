
function func() 
{  let cursor=document.getElementById("cursor");
    let main = document.getElementById("main");
    var timeout;
    main.addEventListener("mousemove",function(e){
        cursor.style.top=e.y+"px";
        cursor.style.left=e.x+"px";
        cursor.style.display="block";
        clearTimeout(timeout);
    timeout=setTimeout(e=>{
        cursor.style.display="none";
    },2000)
    });
    main.addEventListener("mouseout",function(e){
        cursor.style.display="none";
    })
    


    let expression = "";
    function isOperator(char) {
        return ['+', '-', '*', '/', '^', '(', ')'].includes(char);
    }

    function precedence(operator) {
        switch (operator) {
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            case '^':
                return 3;
            default:
                return 0;
        }
    }

    function infixToPostfix(expression) {
        let postfix = '';
        const stack = [];

        for (let i = 0; i < expression.length; i++) {
            let char = expression[i];

            if (char === ' ') {
                continue;
            }

            if (!isOperator(char)) {
                let operand = '';
                while (i < expression.length && !isOperator(expression[i]) && expression[i] !== ' ') {
                    operand += expression[i];
                    i++;
                }
                i--;
                postfix += operand + ' ';
            } else if (char === '(') {
                stack.push(char);
            } else if (char === ')') {
                while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                    postfix += stack.pop() + ' ';
                }
                stack.pop();
            } else {

                while (stack.length > 0 && precedence(stack[stack.length - 1]) >= precedence(char)) {
                    postfix += stack.pop() + ' ';
                }
                stack.push(char);
            }
        }

        while (stack.length > 0) {
            postfix += stack.pop() + ' ';
        }

        return postfix.trim();
    }

    function evaluatePostfix(postfix) {
        const stack = [];

        postfix.split(' ').forEach((token) => {
            if (!isOperator(token)) {
                stack.push(parseFloat(token));
            } else {
                let operand2 = stack.pop();
                let operand1 = stack.pop();
                switch (token) {
                    case '+':
                        stack.push(operand1 + operand2);
                        break;
                    case '-':
                        stack.push(operand1 - operand2);
                        break;
                    case '*':
                        stack.push(operand1 * operand2);
                        break;
                    case '/':
                        stack.push(operand1 / operand2);
                        break;
                    case '^':
                        stack.push(Math.pow(operand1, operand2));
                        break;
                }
            }
        });

        return stack.pop();
    }
    function checkParentheses(expression) {
        let stack = [];
    
        for (let char of expression) {
            if (char === '(') {
                stack.push(char);
            } else if (char === ')') {
                if (stack.length === 0) {
                    return false;
                }
                stack.pop();
            }
        }
    
        return stack.length === 0;
    }
    
    function evaluate(expression) {
      
        const postfix = infixToPostfix(expression);
        return evaluatePostfix(postfix);
    }


    let valid = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", ".","(",")"];
    const x = document.querySelectorAll(".btn");
    x.forEach((btn) => {
        let display = document.getElementById("display");
        btn.addEventListener("click", e => {
            let text = e.target.innerHTML;
            if (text == "AC") {
                display.value = "";
            }
            else if (text == "C") {
                display.value = display.value.slice(0, -1);
            }
            else if (valid.includes(text)) {

                display.value += text;
                expression = display.value;
            }
            else if (text == ":)") {
                display.value = "I do nothing😎";
                display.style.color = "brown";
                setTimeout(function () {
                    display.value = expression;
                    display.style.color = "black";
                }, 1000)
            }
            
            else if (text == "CALCULATE") {
                if(expression==""){
                    display.value ="Requires Input";
                    display.style.color = "orange";
                    setTimeout(function (){
                       display.value="";
                        display.style.color = "black";
                    }, 1000)
                }
                else if(!checkParentheses(expression)){ 
                    display.value ="Wrong Parenthesis";
                    display.style.color = "red";
                    setTimeout(function (){
                       display.value="";
                        display.style.color = "black";
                    }, 1000)
                }
                
                else{
                    if( isNaN(evaluate(expression))){
                        display.value ="Can't Calculate ";
                        display.style.color = "red";
                        setTimeout(function (){
                            display.value="";
                             display.style.color = "black";
                         }, 1000)
                    }
                    else{
                    display.value = evaluate(expression);
                    expression="";
                    }
                }
            }
           
        })
    })
}


