/**
 * Created by tejas on 11-08-2016.
 */
    'use strict';



    angular
        .module('app')


        .controller('Payroll.IndexController', Controller);

    function Controller($http , $scope) {
        var Payroll = this;
        Payroll.IsVisible = false;
        Payroll.spi = false;

         $http.get('employee.json').success(function (response) {

            if(response){
            Payroll.edata =response;
            }

             console.log(Payroll.edata);


        });


        $scope.getdt  = function (eid) {

            console.log("In get data from id function");
            console.log(eid);

            $http.get('employee.json').success(function (response) {


               Payroll.d = response;
               
var i =0;
                    var result = [];
                    var searchfield = "id";
                    var searchval = eid;
                    for (i = 0; i < Payroll.d.length; i++) {

                        if (Payroll.d[i][searchfield] == searchval) {

/*                            Payroll.empname = Payroll.d[i].name;
                            Payroll.empid = Payroll.d[i].id;
                            Payroll.empemail = Payroll.d[i].email;
                            Payroll.position = Payroll.d[i].position;
                            Payroll.nemp = Payroll.d[i].nae;
                            Payroll.empbad = Payroll.d[i].bacd;
                            Payroll.emppan = Payroll.d[i].pan;
                            Payroll.emppf = Payroll.d[i].pf;
                            Payroll.empesi = Payroll.d[i].esi;
                            Payroll.band = Payroll.d[i].band;
                            Payroll.mobile = Payroll.d[i].mobile;
                            Payroll.empcca = Payroll.d[i].cca;
                            Payroll.empsa = Payroll.d[i].sa;
                            Payroll.emppi = Payroll.d[i].pi;
                            Payroll.empaa = Payroll.d[i].aa;
                            Payroll.basic = Payroll.d[i].basic;
                            Payroll.hra = Payroll.d[i].hra;
                            Payroll.conv = Payroll.d[i].conv;
                            Payroll.bonus = Payroll.d[i].bonus;
                            
                            Payroll.totalearnings = Payroll.basic*1 +Payroll.hra*1 + Payroll.conv*1 + Payroll.mobile + Payroll.bonus + Payroll.empcca + Payroll.empsa + Payroll.emppi + Payroll.empaa ;
                            

*/

                            

                        }
                    }

                console.log(Payroll.totalearnings);


            });



        };

        Payroll.getsalary = function () {

            Payroll.spi = true;
            //Post request function data from hr will be entered here to post to the local server which will post it
            // to brms server

            $scope.data = {
                "lookup" : "salarysession",
                "commands": [
                    {
                        "insert": {
                            "out-identifier": "employee-id",
                            "return-object": "true",
                            "object": {
                                "com.knafl.salary_demo.Employee": {
                                    "income": "17000",
                                    "band": "Band18"
                                }
                            }
                        }
                    },
                    {
                        "set-global": {
                            "identifier": "salary",
                            "out-identifier": "salary-id",
                            "object": {
                                "com.knafl.salary_demo.Salary": {
                                    "month": "10",
                                    "earning": "20000.00",
                                    "hasPaidESI": "true"
                                }
                            }
                        }
                    },
                    {
                        "set-focus": {
                            "name": "BasicGroup"
                        }
                    },
                    {
                        "fire-all-rules": ""
                    },
                    {
                        "set-focus": {
                            "name": "FundsGroup"
                        }
                    },
                    {
                        "fire-all-rules": ""
                    }
                ]
            };


//not returning Payroll.mobile
            $http.post('/tejas',$scope.data).then(function (response) {
                var obj = response.data["A"];
                console.log(obj);
                Payroll.basic  = obj["basic"];
                Payroll.hra = obj["hra"];
                var pfDeductible = obj["pfDeductible"];
                var earning = obj["earning"];
                var hasPaidESI =obj["hasPaidESI"];
                Payroll.bonus =obj["bonus"];
                Payroll.epf =obj["employeePF"];
                console.log(Payroll.epf);
                Payroll.cpf =obj["companyPF"];
                Payroll.eesi =obj["employeeESI"];
                Payroll.cesi =obj["companyESI"];
                var month = obj["month"];
                Payroll.conv =obj["conveyance"];
                Payroll.totalearnings = Payroll.basic*1 + Payroll.hra*1 + Payroll.conv*1 + Payroll.mobile*1 + Payroll.bonus*1 + Payroll.empcca*1 + Payroll.empsa*1 + Payroll.emppi*1 + Payroll.empaa*1 ;

                Payroll.spi = false;
                Payroll.IsVisible = true;
            });


            
            
        };

        Payroll.exptbl = function () {

            console.log("In export graph");

            //getting values of current time for generating the file name


                $("#table1").table2excel({
                    // exclude CSS class
                    exclude: ".noExl",
                    name: "Salary Breakup",
                    filename: "Salary Breakup" //do not include extension
                });


        };

              /*  initController();

        function initController($window) {
            // get current user
            UserService.GetCurrent().then(function (user ,res) {
                Payroll.user = user;
                if (Payroll.user.role != "Admin"){ alert("unauthorized access"); window.location = "/" ;}
            });

        } */




    }

