"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var math = require("mathjs");
var SingleSquare = /** @class */ (function () {
    function SingleSquare(row, column) {
        this.row = row;
        this.column = column;
        this.state = "closed";
        this.hasMine = false;
        this.nearMines = 0;
    }
    return SingleSquare;
}());
function criaMatriz(rows, columns) {
    var matriz = [];
    //É necessário declarar um vetor antes de atribuir outros vetores a ele para criar uma matriz.
    for (var i = 0; i < rows; i++) {
        matriz[i] = [];
        //Declara 'rows' vetores, cada um deles contendo outro vetor.
        for (var j = 0; j < columns; j++) {
            matriz[i][j] = new SingleSquare(i, j);
            //Determina a quantidade 'columns' de colunas que cada linha terá, e atribui uma instância a cada posição,
            //inicializando sua coordenada na matriz. 
        }
    }
    return matriz;
}
function sorteiaMinas(matriz, qtdMinas) {
    var minasAtivadas = 0;
    var rows = matriz.length;
    var columns = matriz[0].length;
    //Extrai as dimensões da matriz, sem precisarem ser passadas por parâmetro.
    while (minasAtivadas != qtdMinas) {
        //Bloco é repetido até atingirmos o número de minas ativadas.
        var rowSorteada = math.floor(math.random() * rows);
        var columnSorteada = math.floor(math.random() * columns);
        //Sorteia indices através da função math.random(), que gera um número aleatório entre 0 e 1(exclusivo)
        //A função math.floor é usada para arredondar o número para o inteiro mais baixo, já que estamos lidando com
        //índices não pode ser ponto flutuante e não podemos obter o valor do tamanho do array.
        if (!matriz[rowSorteada][columnSorteada].hasMine) {
            //Se esta coordenada não possuí uma mina ativa executa o bloco.
            matriz[rowSorteada][columnSorteada].hasMine = true;
            minasAtivadas++;
            //Ativa a mina e adiciona ao contador para termos o controle de quantas minas vão ser ativadas.
        }
    }
}
function minasVizinhas(matriz, row, column) {
    if (!matriz[row][column].hasMine) //Se o quadrado tiver uma mina não faz sentido computar as minas vizinhas.
        for (var i = (row - 1); i < (row + 2); i++)
            for (var j = (column - 1); j < (column + 2); j++) //Percorre os quadrados vizinhos 
                if (i >= 0 && i < matriz.length && j >= 0 && j < matriz[0].length) //Faz a validação das coordenadas para elas não extrapolarem os limites da matriz.
                    matriz[i][j].hasMine ? matriz[row][column].nearMines++ : matriz[row][column].nearMines = matriz[row][column].nearMines; //Computa as minas vizinhas no atributo 'nearMines' da instância se não mantem o mesmo valor.
}
function computaMinas(matriz) {
    var row = matriz.length;
    var column = matriz[0].length;
    for (var i = 0; i < row; i++)
        for (var j = 0; j < column; j++)
            minasVizinhas(matriz, i, j);
}
function imprimeMatriz(matriz) {
    var row = matriz.length;
    var column = matriz[0].length;
    var linha = "";
    for (var i = 0; i < row; i++) {
        for (var j = 0; j < column; j++) {
            if (matriz[i][j].hasMine)
                linha += "[#]";
            else if (matriz[i][j].nearMines > 0)
                linha += "[".concat(matriz[i][j].nearMines, "]");
            else
                linha += "[ ]";
            linha += "  ";
        }
        console.log(linha + '\n');
        linha = "";
    }
}
