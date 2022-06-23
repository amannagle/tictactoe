const game = (function (){
    let gameArray = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
    //calls
    //domelements
    const player1 = player('player 1','player','O');
    const player2 = player('player 2','player','X');
    let last_turn=player2;
    let current_turn=player1;
    const start_button = document.querySelector('#game-start');
    const cells = document.querySelectorAll('.cell');
    const board = document.querySelector('.board');
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
        console.log(player2);
        render();
    }
    function searchCell(index)
    {
        return (document.querySelector(`div[index='${index}']`));
    }
    function player(name,type,sign)
    {
        
        return{name: name,type: type,sign: sign};
    }
    function render()
    {
        board.style['display']='grid';
        select_player_div.style['display']='none';
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
        for(let i=0; i<2;i+=2)
        
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
            alert(`${last_turn.name} won`);
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

