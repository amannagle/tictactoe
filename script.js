const game = (function (){
    let gameArray = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
    //calls
    //domelements
    const player1 = player('player 1','player','O',0);
    const player2 = player('player 2','player','X',0);
    let last_turn=player2;
    let current_turn=player1;
    let round=0;
    const restart_button = document.querySelector('#play-again');
    const start_button = document.querySelector('#game-start');
    const cells = document.querySelectorAll('.cell');
    const board = document.querySelector('.board');
    const main = document.querySelector('main');
    const header = document.querySelector('header');
    const score = document.querySelector('.score');
    const player1_score = document.querySelector('#player1score');
    const player2_score = document.querySelector('#player2score');
    const player1_para = document.querySelector('#player1');
    const player2_para = document.querySelector('#player2');
    const player1_input = document.querySelector('#player1_name');
    const player2_input = document.querySelector('#player2_name');
    const select_player_div = document.querySelector('.select-player');
    const winner_div = document.querySelector('.winnerdiv');
    const winner_para = winner_div.firstChild;
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
        last_turn=player2;
        current_turn=player1;
        const opponent = player_select.value;
        player2.type=opponent;
        if(player1_input.value !='')
        {
            player1.name=player1_input.value;
        }
        if(player2_input.value !='')
        {
            player2.name=player2_input.value;
        }
        player1_para.textContent=player1.name;
        player2_para.textContent=player2.name;
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
        if(checkGame() == 'gameover')
        {
            restartGame();
            return;
        }
        winner_div.style['display']='none';
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
        if(player1.score == 3 || player2.score == 3)
        {
            let winner = player1.score>player2.score?player1.name:player2.name;
            winner_div.style['display']='flex';
            winner_para.textContent=`${winner} has won the game`;
            return 'gameover';
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
            let result = checkresult();
            if(result !='draw' && result!='win')
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
    function restartGame()
    {
        restart_button.style['display']='block';
    }
    function announcewinner(winner)
    {
        if (winner == 'draw')
        {
            winner_div.style['display']='flex';
            winner_para.textContent=`Round ${round} was a draw`
            return;   
        }
        winner_div.style['display']='flex';
        winner_para.textContent=`${winner} has won round ${round}`
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
        for(let i=0;i<9;i++ && result !='success')
        {
            if(gameArray[i]!= 'X' && gameArray[i] != 'O')
            break;
            if(i == 8)
            result='draw';
        }
        if(result == 'success')
        {
            last_turn.score++;
            round++;
            const winner = last_turn.name;
            announcewinner(winner);
            gameArray=[undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
            setTimeout(function(){
                gameStart(); 
           }, 2000);
            
            return 'win';
        }
        else if (result == 'draw')
        {
            announcewinner('draw');
            gameArray=[undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
            setTimeout(function(){
                gameStart();
           }, 2000);
            return 'draw';
        }
        
    }
})();

