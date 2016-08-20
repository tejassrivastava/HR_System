require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var request = require('request');
app.use(require("./logging"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});



app.post('/tejas',function (req,res) {

    //console.log(req.body);

    
    var jdata = req.body;

    var x1="";
    var x2="";
    var  xbasic = "";
    var xhra = "";
    var xpfDeductible = "";
    var xearning = "";
    var xhasPaidESI ="";
    var xbonus ="";
    var xemployeePF ="";
    var xcompanyPF = "";
    var xemployeeESI ="";
    var xcompanyESI ="";
    var xmonth = "";
    var xconveyance ="";
    request({
        url: 'http://192.241.135.199:8080/kie-server/services/rest/server/containers/instances/salaryDemo',



        method: 'POST',
        headers: {
            'X-KIE-ContentType': 'JSON',
            'Content-Type': 'application/JSON',
            'Authorization': 'Basic a2VlbjprZWVuYWJsZSExMjM='
        },
        json: jdata
    }, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            //Parsing Rate Form Raw Data
            //var x = JSON.parse(JSON.stringify(body));

            var x = {
                "type" : "SUCCESS",
                "msg" : "Container salaryDemo successfully called.",
                "result" : {
                    "execution-results" : {
                        "results" : [ {
                            "key" : "",
                            "value" : 0
                        }, {
                            "key" : "employee-id",
                            "value" : {"com.knafl.salary_demo.Employee":{
                                "band" : "Band18",
                                "income" : 17000
                            }}
                        }, {
                            "key" : "salary-id",
                            "value" : {"com.knafl.salary_demo.Salary":{
                                "basic" : 8500.0,
                                "hra" : 3400.0,
                                "pfDeductible" : 9999999,
                                "earning" : 20000.0,
                                "hasPaidESI" : true,
                                "bonus" : 0.0,
                                "employeePF" : 0.0,
                                "companyPF" : 0.0,
                                "employeeESI" : 0.0,
                                "companyESI" : 0.0,
                                "month" : 10,
                                "conveyance" : 1500.0
                            }}
                        } ],
                        "facts" : [ {
                            "key" : "employee-id",
                            "value" : {"org.drools.core.common.DefaultFactHandle":{
                                "external-form" : "0:2:1661029059:1661029059:2:DEFAULT:NON_TRAIT:com.knafl.salary_demo.Employee"
                            }}
                        } ]
                    }
                }
            };

            //x1=(x.result['execution-results']['results']);
            //x2=x1[1]['value']['com.knafl.brms_demo_basic.Policy']['rate'];
            //  x1=(x.result['execution-results']['results']);
            // x2=x1[2]['value']['com.knafl.brms_demo_basic.Policy']['rate'];


            /* x1=(x.result['execution-results']['results']);
             x2=x1[2]['value']['com.knafl.brms_demo_rakshak.Policy'];
             x3=x2['outstanding'];
             x4=x2['term'];
             x5=x2['year'];
             x6=x2['pptterm'];
             x7=x2['ssvfrate'];
             x8=x2['gsvfrate'];
             x9=x2['bsvfrate'];
             x10=x2['bprrate'];
             x11=x2['sucfrate'];
             x12=x2['ferate'];
             x13=x2['emrrate'];
             x14=x2['bgsvfrate'];
             x15=x2['svfrate']; */
            console.log("fetching from BRMS");

            /*x =   x.replace(/\\n/g, "")
             .replace(/\\/g,"")
             .replace(/\ /g,"");*/

            x1=(x.result['execution-results']['results']);
            x2=x1[2]['value']['com.knafl.salary_demo.Salary'];
            xbasic = x2['basic'];
            xhra = x2['hra'];
            xpfDeductible = x2['pfDeductible'];
            xearning = x2['earning'];
            xhasPaidESI = x2['hasPaidESI'];
            xbonus = x2['bonus'];
            xemployeePF = x2['employeePF'];
            xcompanyPF = x2['companyPF'];
            xemployeeESI = x2['employeeESI'];
            xcompanyESI = x2['companyESI'];
            xmonth = x2['month'];
            xconveyance = x2['conveyance'];

            



             return res.json({ A: x2 , B:xbasic });



        }

    });




});

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});