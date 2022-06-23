const game = (function (){
    let gameArray = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
    //calls
    //domelements
    const player1 = player('player 1','player','O',0);
    const player2 = player('player 2','player','X',0);
    let last_turn=player2;
    let current_turn=player1;
    const start_button = document.querySelector('#game-start');
    const cells = document.querySelectorAll('.cell');
    const board = document.querySelector('.board');
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    const score = document.querySelector('.score');
    const player1_score = document.querySelector('#player1score');
    const player2_score = document.querySelector('#player2score');
    const select_player_div = document.querySelector('.select-player');
    //listeners
    start_button.addEventListener('click',gameStart);
    player_select = document.querySelector('#player-select');
    cells.forEach((cell)=>{
        const index = cell.getAttribute('index');
        cell.addEventListener('click',updateCell);
    })
    //functions
    function gameStart()
    {
        const opponent = player_select.value;
        player2.type=opponent;
        opponent=='ai'?player2.name='AI':player2.name='player2';
        render();
    }
    function searchCell(index)
    {
        return (document.querySelector(`div[index='${index}']`));
    }
    function player(name,type,sign,score)
    {
        
        return{name: name,type: type,sign: sign,score:score};
    }
    function render()
    {
        checkGame();
        board.style['display']='grid';
        select_player_div.style['display']='none';
        header.style['display']='none';
        main.style['display']='flex';
        score.style['display']='block';
        player1_score.textContent=player1.score;
        player2_score.textContent=player2.score;
        for(let i=0;i<gameArray.length;i++)
        {
            if(typeof(gameArray[i])=='undefined')
            {
                searchCell(i).textContent='';
            }
            else
            {
                searchCell(i).textContent=gameArray[i];
            }
        }
    }
    function checkGame()
    {
        if(player1.score == 3 || player2.score ==3)
        {
            let winner = player1.score>player2.score?player1.name:player2.name;
            alert(`game is over ${winner} won`)
        }
    }
    function updateCell(e)
    {
        index=e.target.getAttribute('index');
        if(typeof(gameArray[index]) != 'undefined')
        return;
        if(current_turn == player1 && player2.type =='ai')
        {
            gameArray[index]=current_turn.sign;
            render();
            last_turn=player1;
            current_turn=player2;
            checkresult();
            aimove();
        }
        else
        {
        gameArray[index]=current_turn.sign;
        render();
        last_turn=current_turn;
        current_turn = current_turn==player1?player2:player1;
        checkresult();
        }
        
    }
    

    function aimove()
    {
        let cell_number;
        do
        {
            cell_number=Math.floor(Math.random()*9);
        }
        while(typeof(gameArray[cell_number]) != 'undefined')
        gameArray[cell_number]=player2.sign;
        last_turn=current_turn;
        current_turn=player1;
        render();
        checkresult();
    }
    function checkresult()
    {
        
        let result='';
        for(let i=0; i<9;i+=3)
        {
            if((gameArray[i]==gameArray[i+1] && gameArray[i] == gameArray[i+2]) && (typeof(gameArray[i])!='undefined' && (typeof(gameArray[i+1])!='undefined' && typeof(gameArray[i+2])!='undefined')))
            {
                result='success';
            }

        }

        for(let i=0;i<3;i++)
        {
            if((gameArray[i]==gameArray[i+3] && gameArray[i] == gameArray[i+6]) && (typeof(gameArray[i])!='undefined' && (typeof(gameArray[i+3])!='undefined' && typeof(gameArray[i+6])!='undefined')))
            {
                result = 'success';
            }
        }
        if((gameArray[0]==gameArray[4] && gameArray[0] == gameArray[8]) && (typeof(gameArray[0])!='undefined' && (typeof(gameArray[4])!='undefined' && typeof(gameArray[8])!='undefined')))
            {
                result = 'success';
            }
        if((gameArray[2]==gameArray[4] && gameArray[2] == gameArray[6]) && (typeof(gameArray[2])!='undefined' && (typeof(gameArray[4])!='undefined' && typeof(gameArray[6])!='undefined')))
            {
                result='success';
            }
        for(let i=0;i<9;i++)
        {
            if(gameArray[i]!= 'X' && gameArray[i] != 'O')
            break;
            if(i == 8)
            result='draw';
        }
        if(result == 'success')
        {
            last_turn.score++;
            alert(`${last_turn.name} won`);
            last_turn=current_turn;
            current_turn = current_turn==player1?player2:player1;
            gameArray=[undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
            render();
        }
        else if (result == 'draw')
        {
            alert(`game drawn`)
            gameArray=[undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
            render();
        }
        
    }
})();

