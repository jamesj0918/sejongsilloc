<template lang="html">
    <div id="wrap">
        <div id="cell">
            <div id="tableDiv">
                <div class="img">
                    <router-link to="/login">
                        <img src="../../images/login_logo.png">
                    </router-link>
                </div>
                <div id="loginDiv">
                    <div id="formwrap">
                        <div>
                            <router-view/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: "LoginLayout"
    }
</script>

<style scoped>

    *{
        margin: 0;
        padding: 0;
        font-family: Noto Sans KR;
    }

    #wrap {
        position: absolute;
        display: table;
        width: 100vw;
        height: auto;

        min-height: 100vh;

        background: linear-gradient(135deg, #8c151f 25%,#d6716f 0,#d6716f 50%,  #8c151f 0, #8c151f 75%, #d6716f 0);
        text-align: center;
        background-size: 5px 5px;
    }

    #cell{
        display: table-cell;
        vertical-align: middle;
    }

    #tableDiv{
        border: 1px solid;
        display: table;
        width: 80%;
        max-width: 900px;
        height: 70vh;

        margin: 0 auto;
        vertical-align: middle;
        background-color: #f8f8f8;
        border-radius: 10px;
        box-shadow: 1px 3px 20px ;

    }

    .img{
        display: inline-block;
        width: 50%;
        height: 100%;

        float: left;
    }

    img{
        height: 45%;
        width: 70%;
        margin-top: 40%;
    }

    #loginDiv{

        display:table;
        width: 50%;
        height: 100%;
        float: right;
    }

    #formwrap{
        display:table-cell;
        height: inherit;
        vertical-align: middle;
        margin: auto;
    }

    #loginDiv >#formwrap> #form{
        display: inline-block;
        width: 80%;
        height: auto;
        padding: 15px;
        padding-top: 30px;
        padding-bottom: 30px;
        margin-top: 5%;
        background-color: white;
        box-shadow: 3px 6px 30px lightgray;
        border-radius: 10px;
        float: none;
    }
    #form>form>p{
        display: inline-block;
        width: 85%;
        text-align: left;
        margin: 0 auto;

        margin-bottom: 5px;
        font-size: 15px;
    }

    #form>form>input:focus{
        background: #f8f8f8;
        border: 1px solid lightgray;
    }

    #form >form> input{
        padding-left: 15px;
        width: 85%;
        margin-bottom: 15px;
        height: 40px;
        outline: none;
        background-color: lightgray;
        border-style: none;
        border-radius: 10px;
    }

    #form > form> button{
        margin-top: 20px;
        width: 85%;
        height: 40px;
        outline: none;
        border-style: none;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        font-size: 15px;
        background-color:  #ab2631;
    }

    #divider{
        margin: 20px auto;
        width: 80%;
    }

    #joinDiv{
        background-color: white;
        box-shadow: 3px 6px 30px lightgray;
        border-radius: 10px;
        width: 80%;
        text-align: center;
        height: 10%;
        line-height: 50px;
        min-height: 50px;
        margin-bottom: 5%;
        display: inline-block;

    }



    #joinDiv>form>p{
        display: inline-block;
        text-align: center;
        width: 70%;
        height: 100%;
        padding: 0 auto;
    }

    #joinDiv>form>p>a{
        color:  #ab2631;
        font-weight: bold;
    }

    @font-face{
        font-family: 'Noto Sans KR', sans-serif;
        font-display: fallback;
    }

    @media all and (max-width:1024px) {

    }
    /* 4. 모바일 (해상도 640px 이하) */
    @media all and (max-width:640px) {
        #cell{
            display: table-cell;
            vertical-align: center;
            width: 100vw;
            height: 100vh;
        }
        #tableDiv{
            display: table;
            height: 90%;
            width: 90%;
            background-color: white;
        }
        #formwrap{
            display: inline-block;
            width:100%;
            height: 100%;
        }

        #loginDiv >#formwrap> #form{
            background-color: white;
            height: 70%;
            width: 99%;
            border-style: none;
            border-radius: 0px;
            box-shadow: 0 0;
        }

        #form>form>input{
            width: 100%;
            height: 50px;
        }
        #form>form>p{
            width: 100%;
        }
        #form > form> button{
            width: 100%;
            height:50px;
        }
        #loginDiv{
            display: inline-block;
            height: 75%;
            width :100%;
            float: none;
        }

        #joinDiv{
            background-color: rgba(0,0,0,0);

            height: 10%;
            width: 99%;
            box-shadow: 0 0;
        }
        .img{
            display: inline-block;
            height: 20%;
            float: none;
        }

        img{
            margin-top: 0;
            height: 30%;
        }

        .div{
            display: block;
            height: 5%;

        }
    }



</style>
