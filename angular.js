'use strict';

var app = angular.module('angApp', []);

app.controller('globalController', function($scope){
  
  $scope.chooseTeam = function(availTeams, altTeam){
    for(var i = 0; i < $scope.teams.length; i++){
      var team = $scope.teams[i].name;
      var check = _.indexOf(availTeams, team);
      if(check != -1){
        if(altTeam && altTeam.played.length > 0){
          var passing = true;
          for(var index = 0; index < altTeam.played.length; index++){
            if(team === altTeam.played[index]){
              passing = false;
            }
          }
          if(passing === true){
            return $scope.teams[i];
          } else {
            availTeams = _.without(availTeams, team);
            $scope.chooseTeam(availTeams, altTeam);
          }
        } else {
          return $scope.teams[i];
        }
      }
    }
  }
  
  $scope.teams = [
    {
      name: "Blues",
      played: []
    },
    {
      name: "Kings",
      played: []
    },
    {
      name: "Sharks",
      played: []
    },
    {
      name: "Coyotes",
      played: []
    }
  ];
  
  $scope.tournament = {
    totalGames: "",
    gamesPerDay: "",
    days: 3
  };
  
  $scope.days = [];
  
  $scope.setDaySchedule = function(days, games){
    _.each($scope.teams, function(team, i){
      $scope.teams[i] = {
        name: team.name,
        played: []
      };
    });
    if($scope.shuffled === true){
      $scope.teams = _.shuffle($scope.teams);
    }
    
    
    // Loop through each day and set games
    for(var i = 0; i < days; i++){
      var game = [];
      
      // Build temp array of teams
      var availTeams = [];
      
      for (var index = 0; index < $scope.teams.length; index++){
        availTeams.push($scope.teams[index].name);
      }
      
      for(var ind = 0; ind < games; ind++){
        game.push(ind);
        game[ind] = {
          team_1: "",
          team_2: ""
        }
        
        var team_1 = $scope.chooseTeam(availTeams);
        var i1 = $scope.teams.indexOf(team_1);
        availTeams.splice(_.indexOf(availTeams, team_1.name), 1);
        
        var team_2 = $scope.chooseTeam(availTeams, team_1);
        var i2 = $scope.teams.indexOf(team_2);
        availTeams.splice(availTeams.indexOf(team_2.name), 1);
        
        game[ind].team_1 = team_1.name;
        game[ind].team_2 = team_2.name;
        
        $scope.teams[i1].played.push(team_2.name);
        $scope.teams[i2].played.push(team_1.name);

      }
      $scope.days[i] = game;
      // console.log("days" + JSON.stringify($scope.days));
    }
  };
  
  $scope.setTournamentSchedule = function(teams){
    
    $scope.tournament.gamesPerDay = teams.length / 2;
    if($scope.tournament.days === undefined){
      $scope.tournament.totalGames = 0;
    } else {
      $scope.tournament.totalGames = $scope.tournament.gamesPerDay * $scope.tournament.days;
    }
  };
  
});