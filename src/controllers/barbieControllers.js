import dados from "../models/dados.js";
const { barbies } = dados;

const getAllBarbies = (req, res) => {
  let resultado = barbies;

  res.status(200).json({
    total: resultado.length,
    data: resultado,
  });
};

const getBarbiesById = (req, res) => {
     const id = parseInt(req.params.id);

    const barbie = barbies.find(b => b.id === parseInt(id));

    if (barbie) {
    res.status(200).json(barbie);
  } else {
    res.status(404).json({
      erro: `Barbie com id ${id} não encontrado!`,
    });
  }
};

const createBarbie = (req, res) => {
    const {id, nome, profissao, anoLancamento} = req.body;

    if(!nome || !profissao){
        return res.status(400).json({
            sucess: false,
            message: "Nome e profissão são obrigatorios"
        });
    } 

    const novaBarbie = {
        id: barbies.length + 1,
        nome: nome,
        profissao: profissao,
        anoLancamento: parseInt(anoLancamento)
    }

    barbies.push(novaBarbie);

    res.status(201).json({
        sucess: true,
        message:"Barbie cadastrada com sucesso",
        barbie:novaBarbie
    });
}

const deleteBarbie= (req, res) => {
    console.log("Passou por aqui")
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(400).json({
            sucess: false,
            message: "O id deve ser Válido"
        });
    }
    const barbieParaRemover = barbies.find(b => b.id === id);

    if(!barbieParaRemover) {
        return res.status(404).json({
            sucess: false,
            message:`Barbie com id: ${id} não existe`
        });
    }

    const barbiesFiltrados = barbies.filter(barbie => barbie.id !== id);
    
    barbies.splice(0, barbies.length, ...barbiesFiltrados);

    res.status(200).json ({
        sucess: true,
        message: `A barbie ${id} foi removida com sucesso`
    });
}

export { getAllBarbies, getBarbiesById, createBarbie, deleteBarbie };