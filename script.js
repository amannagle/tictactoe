const game = (function (){
    const gameArray = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];
    //calls
    //domelements
    const player1 = player('player 1','player','O');
    const player2 = player('player 2','player','X');
    let last_turn=player2;
    let current_turn=player1;
    const cells = document.querySelectorAll('.cell');
    //listeners
    cells.forEach((cell)=>{
        const index = cell.getAttribute('index');
        cell.addEventListener('click',updateCell);
    })
    //functions
    
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
        console.log('call to render')
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
        gameArray[index]=current_turn.sign;
        render();
        console.log(gameArray[index]);
        last_turn=current_turn;
        current_turn = current_turn==player1?player2:player1;
        if(checkresult() === 'success')
        setTimeout(function(){
            alert(`gameover ${last_turn.name} won`); 
       }, 500);
    }
    
    function checkresult()
    {
        let flag=0;
        for(let i=0; i<9;i+=3)
        {
            if((gameArray[i] == gameArray[i+1] && gameArray[i] == gameArray[i+2]) && (typeof(gameArray[i])!='undefined' && (typeof(gameArray[i+2])!='undefined' && typeof(gameArray[i+3])!='undefined')))
            {
                flag=1;
                break;
            }

        }

        for(let i=0;i<3;i++)
        {
            if((gameArray[i]==gameArray[i+3] && gameArray[i] == gameArray[i+6]) && (typeof(gameArray[i])!='undefined' && (typeof(gameArray[i+3])!='undefined' && typeof(gameArray[i+6])!='undefined')))
            {
                flag=1;
            }
        }
        if(flag == 1)
        {
            return 'success';
        }
    }
})();

