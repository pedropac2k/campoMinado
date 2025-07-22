import * as math from "mathjs";

interface Square{
    row: number;
    column: number;
    state: string;
    hasMine: boolean;
    nearMines: number;

}


class SingleSquare {
    //Toda vez que uma instância for criada ela será inicializada com estes atributos por padrão.
    //É importante notar que os atributos 'row' e 'column' serão únicos para cada instância pois indentificam o posicionamento dela na matriz.
    row: number;
    column: number;
    state: "closed" | "opened" | "flagged";
    hasMine: boolean;
    nearMines: number;
    constructor(row: number, column: number){
        this.row = row;
        this.column = column;
        this.state = "closed";
        this.hasMine = false;
        this.nearMines = 0;
    }
}


function criaMatriz(rows: number, columns: number) : Square[][]{
    const matriz: SingleSquare[][] = [];
    //É necessário declarar um vetor antes de atribuir outros vetores a ele para criar uma matriz.

    for(let i: number =0; i<rows; i++){
        matriz[i] = [];
        //Declara 'rows' vetores, cada um deles contendo outro vetor.
        for(let j: number=0; j<columns; j++){
            matriz[i][j] = new SingleSquare(i, j);
            //Determina a quantidade 'columns' de colunas que cada linha terá, e atribui uma instância a cada posição,
            //inicializando sua coordenada na matriz. 
        }
    }

    return matriz;
}


function sorteiaMinas(matriz: Square[][], qtdMinas: number){
    let minasAtivadas: number = 0;

    const rows: number = matriz.length;
    const columns: number = matriz[0].length;
    //Extrai as dimensões da matriz, sem precisarem ser passadas por parâmetro.

    while(minasAtivadas != qtdMinas){
        //Bloco é repetido até atingirmos o número de minas ativadas.
        let rowSorteada: number = math.floor(math.random() * rows );
        let columnSorteada: number = math.floor(math.random() * columns);
        //Sorteia indices através da função math.random(), que gera um número aleatório entre 0 e 1(exclusivo)
        //A função math.floor é usada para arredondar o número para o inteiro mais baixo, já que estamos lidando com
        //índices não pode ser ponto flutuante e não podemos obter o valor do tamanho do array.

        if (!matriz[rowSorteada][columnSorteada].hasMine){
            //Se esta coordenada não possuí uma mina ativa executa o bloco.
            matriz[rowSorteada][columnSorteada].hasMine = true;
            minasAtivadas++;
            //Ativa a mina e adiciona ao contador para termos o controle de quantas minas vão ser ativadas.
        }
    }
}


function minasVizinhas(matriz: Square[][], row: number, column: number){
    if(!matriz[row][column].hasMine) //Se o quadrado tiver uma mina não faz sentido computar as minas vizinhas.
        for(let i: number=(row-1); i<(row+2); i++)
            for(let j: number=(column-1); j<(column+2); j++) //Percorre os quadrados vizinhos 
                if(i >= 0 && i < matriz.length && j >= 0 && j < matriz[0].length)//Faz a validação das coordenadas para elas não extrapolarem os limites da matriz.
                    matriz[i][j].hasMine ? matriz[row][column].nearMines++ : matriz[row][column].nearMines = matriz[row][column].nearMines; //Computa as minas vizinhas no atributo 'nearMines' da instância se não mantem o mesmo valor.
}


function computaMinas(matriz: Square[][]){
    const row: number = matriz.length;
    const column: number = matriz[0].length;

    for(let i: number=0; i<row; i++)
        for(let j: number=0; j<column; j++)
            minasVizinhas(matriz, i, j);
}


function imprimeMatriz(matriz: Square[][]){
    const row: number = matriz.length;
    const column: number = matriz[0].length;

    let linha: string = "";
    for(let i: number=0; i<row; i++){
        for(let j: number=0; j<column; j++){
            if(matriz[i][j].hasMine)
                linha += "[#]";
            else if(matriz[i][j].nearMines > 0)
                linha += `[${matriz[i][j].nearMines}]`;
            else
                linha += "[ ]";
            linha += "  ";
        }
        console.log(linha + '\n');
        linha = "";
    }
}