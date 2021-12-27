const keys = [
  'cellphone',
  'cep',
  'name',
  'cpf',
  'telephone',
  'district',
  'state',
  'city',
  'address',
  'birth_date',
  'complement',
  'naturalness',
  'number',
  'email',
  'sex',
  'rg'
];

const values = [
  '(19) 9 8262-1117',
  '13.203-544',
  'Lucas Peixoto',
  '410.146.098-10',
  '(19) 9 8262-1117',
  'Parque Cidade Jardim II',
  'SP',
  'Jundiaí',
  'Rua Leonilda Craveiro',
  '1991-10-30',
  'Próximo aos prédios',
  'Brasileiro',
  134,
  'lucas.sacramoni@gmail.com',
  'Masculino',
  '47.930.656-4'
];

[keys, values].forEach((key, value) => {
  console.log(value)  
})
