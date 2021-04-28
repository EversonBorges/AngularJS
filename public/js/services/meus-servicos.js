angular.module('meusServicos',['ngResource'])
.factory('recursoFoto',function($resource){

    return $resource('v1/fotos/:fotoId', null, {
        update: {
            method: 'PUT'
        }
    });
})
.factory('cadastroDeFotos', function(recursoFoto, $q, $rootScope){

    var servico = {};
    var evento = 'fotoCadastrada';

    servico.cadastrar = function(foto){
        return $q(function(resolve, reject){
            if(foto._id){
                //$rootScope.focado = true
                $rootScope.$broadcast(evento);

                recursoFoto.update({fotoId: foto._id}, foto, function(){
                    resolve({
                        mensagem : 'Foto ' + foto.titulo + ' atualizada com sucesso!',
                        inclusao : false
                    });

                },function(erro){
                    console.log(erro)
                    reject({
                        mensagem : 'Não foi possivel alterar a foto ' + foto.titulo
                    });
                });
            }else{
                //$rootScope.focado = true
                $rootScope.$broadcast(evento);

              recursoFoto.save(foto, function(){
                  resolve({
                      mensagem : 'Foto ' + foto.titulo + ' incluída com sucesso',
                      inclusao : true
                  });
              }, function(erro){
                    console.log(erro)
                    reject({
                        mensagem : 'Não foi possivel incluir a foto ' + foto.titulo
                    });
              });  
            }
        });
    };

    return servico;
});
