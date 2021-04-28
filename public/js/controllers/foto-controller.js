angular.module('alurapic').controller('FotoController', function($scope, $http,recursoFoto,cadastroDeFotos,$routeParams){
    
    $scope.foto = {};
    $scope.mensagem = '';

    if($routeParams.fotoId){

        recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto){
            $scope.foto = foto;
        }, function(erro){
            console.log(erro);
            $scope.mensagem = 'Não foi possivel encontrar a foto ';
        });

        /*$http.get('v1/fotos/' + $routeParams.fotoId)
        .success(function(foto){
            $scope.foto = foto;
        })
        .error(function(erro){
            console.log(erro);
            $scope.mensagem = 'Não foi possivel encontrar a foto ';
        });*/
    }

    $scope.submeter = function(){
       if ($scope.formulario.$valid) {
         cadastroDeFotos.cadastrar($scope.foto)
            .then(function(dados){
                $scope.mensagem = dados.mensagem;
                //Limpa o form se for inclusão
                if(dados.inclusao){
                    $scope.foto = {};
                } 
                
            })
            .catch(function(dados){
                $scope.mensagem = dados.mensagem;
            });
       }   
    };
});

/*if($scope.foto._id){

    recursoFoto.update({fotoId: $scope.foto._id},$scope.foto, function(){
        $scope.mensagem = 'Atualizada a foto '+$scope.foto.titulo+ ' com sucesso';
    }, function(erro){
        console.log(erro);
        $scope.mensagem = 'Erro ao atualizar a foto '+$scope.foto.titulo;
    });

   /*$http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
    .success(function(){
       $scope.mensagem = 'Atualizada a foto '+$scope.foto.titulo+ ' com sucesso';
    })
    .error(function(erro){
        console.log(erro);
        $scope.mensagem = 'Erro ao atualizar a foto '+$scope.foto.titulo;
    });*/
  
    /*}else{
    recursoFoto.save($scope.foto, function(){
        $scope.foto = {};
        $scope.mensagem = 'Salvo com sucesso';
    }, function(erro){
        console.log(erro);
        $scope.mensagem = 'Erro ao salvar';
    })
    
   /* $http.post('v1/fotos',$scope.foto)
    .success(function(){
        $scope.foto = {};
       $scope.mensagem = 'Salvo com sucesso';
    })
    .error(function(erro){
        $scope.mensagem = 'Erro ao salvar';
    });*/

   //}