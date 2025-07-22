import * as math from "mathjs";

class Square {
	//Toda vez que uma instância for criada ela será inicializada com estes atributos por padrão.
	//É importante notar que os atributos 'row' e 'column' serão únicos para cada instância pois indentificam o posicionamento dela na matriz.
	constructor(row, column){
		this.row = row;
		this.column = column;
		this.state = "closed";
		this.hasMine = false;
		this.nearMines = 0;
	}
}


function criaMatriz(rows, columns){
	let matriz = [];
	//É necessário declarar um vetor antes de atribuir outros vetores a ele para criar uma matriz.

	for(let i=0; i<rows; i++){
		matriz[i] = [];
		//Declara 'rows' vetores, cada um deles contendo outro vetor.
		for(let j=0; j<columns; j++){
			matriz[i][j] = new Square(i, j);
			//Determina a quantidade 'columns' de colunas que cada linha terá, e atribui uma instância a cada posição,
			//inicializando sua coordenada na matriz. 
		}
	}

	return matriz;
}


function sorteiaMinas(matriz, qtdMinas){
	let minasAtivadas = 0;

	const rows = matriz.length;
	const columns = matriz[0].length;
	//Extrai as dimensões da matriz, sem precisarem ser passadas por parâmetro.

	while(minasAtivadas != qtdMinas){
		//Bloco é repetido até atingirmos o número de minas ativadas.
		let rowSorteada = math.floor(math.random() * rows );
		let columnSorteada = math.floor(math.random() * columns);
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


function minasVizinhas(matriz, row, column){

	if(!matriz[row][column].hasMine) //Se o quadrado tiver uma mina não faz sentido computar as minas vizinhas.
		for(let i=(row-1); i<(row+2); i++)
			for(let j=(column-1); j<(column+2); j++) //Percorre os quadrados vizinhos 
				if(i >= 0 && i < matriz.length && j >= 0 && j < matriz[0].length)//Faz a validação das coordenadas para elas não extrapolarem os limites da matriz.
					matriz[i][j].hasMine ? matriz[row][column].nearMines++ : matriz[row][column].nearMines = matriz[row][column].nearMines; //Computa as minas vizinhas no atributo 'nearMines' da instância se não mantem o mesmo valor.
}