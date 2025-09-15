import dados from "../models/dados.js";
const { carros } = dados;

const getAllCarros = (req, res) => {
  let resultado = carros;

  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
};

const getCarrosById = (req, res) => {
     const id = parseInt(req.params.id);

    const carro = carros.find(b => b.id === parseInt(id));

    if (carro) {
    res.status(200).json(carro);
  } else {
    res.status(404).json({
      erro: `Carro com id ${id} não encontrado!`,
    });
  }
};

const createCarro = (req, res) => {
    const {id, nome, modelo, anoLancamento, qtdeVitorias, cor} = req.body;

    if(!nome || !modelo){
        return res.status(400).json({
            success: false,
            message: "Nome e profissão são obrigatorios"
        });
    } 

    const novoCarro = {
        id: carros.length + 1,
        nome: nome,
        modelo: modelo,
        anoLancamento: parseInt(anoLancamento),
        qtdeVitorias: qtdeVitorias,
        cor: cor
    }

    carros.push(novoCarro);

    res.status(201).json({
        success: true,
        message:"Carro cadastrado com sucesso",
        carro:novoCarro
    });
}

const deleteCarro= (req, res) => {
    console.log("Passou por aqui")
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({
            success: false,
            message: "O id deve ser Válido"
        });
    }
    const carroParaRemover = carros.find(b => b.id === id);

    if(!carroParaRemover) {
        return res.status(404).json({
            success: false,
            message:`Carro com id: ${id} não existe`
        });
    }

    const carrosFiltrados = carros.filter(carro => carro.id !== id);
    
    carros.splice(0, carros.length, ...carrosFiltrados);

    res.status(200).json ({
        sucess: true,
        message: `O carro ${id} foi removida com sucesso`
    });
}

const updateCarro = (req, res) => {
    const id = parseInt(req.params.id);
    const {nome, modelo, anoLancamento, qtdeVitorias, cor } = req.body;

    const idParaEditar = id;

    if(isNaN(idParaEditar)){
        return res.status(400).json({
            success: false,
            message: "O id deve ser um numero válido"
        });
    }
    
    const carroExiste = carros.find(carro => carro.id === idParaEditar);
    if(!carroExiste){
        return res.status(404).json({
            success: false,
            messagem: `O carro com o id: ${idParaEditar} não existe.`
        });
    }

    const carrosAtualizados = carros.map(carro=> carro.id === idParaEditar ? {
        ...carro,
        ...(nome && { nome }),
        ...(modelo && { modelo}),
        ...anoLancamento && { anoLancamento: parseInt(anoLancamento) },
        ...(qtdeVitorias && {qtdeVitorias}),
        ...(cor && {cor})

    } 
    
    : carro

    );

    carros.splice(0, carros.length, ...carrosAtualizados);

    const carroEditado = carros.find
    (carro => carro.id === idParaEditar);
    res.status(200).json({
        success: true,
        message: "Dados atualizados com sucesso.",
        carro: carroEditado
    });

}

export { getAllCarros, getCarrosById, createCarro, deleteCarro, updateCarro };