package main

import(
	"net/http"
	"fmt"
	"encoding/json"
	"strconv"
	"log"
	b64 "encoding/base64"
	"io/ioutil"
	"strings"
	"bytes"


	"github.com/julienschmidt/httprouter"
)

func GetProductList(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	products := GetProductAll()

	response := &Response{}

	response.Data = products

	Render(w, req, response, 200)
}

func GetProductDetail(w http.ResponseWriter, req *http.Request, params httprouter.Params) {
	idstring := params.ByName("id")
	
	idInt , _ := strconv.Atoi(idstring)
	product := GetProduct(idInt)

	response := &Response{}
	response.Data = product

	Render(w, req, response, 200)
}

func ProductUpload(w http.ResponseWriter, req *http.Request, params httprouter.Params) {
	decoder := json.NewDecoder(req.Body)

    var product ProductForm   
    err := decoder.Decode(&product)
    if err != nil {
        log.Println(err)
    }

    NewProduct := &Product{}

    NewProduct.Name  			= product.Name
    NewProduct.Price, _			= strconv.Atoi(product.Price)
    NewProduct.Description  	= product.Description

    for _, v := range product.Images {
    	split := strings.Split(v.File, ",")
    	var file string
    	if len(split) > 1 {
    		file = split[1]
    	} else {
    		file = split[0]
    	}

    	bytes, err := b64.StdEncoding.DecodeString(file)
    	if err != nil {
    		log.Println(err, "")
    	} else {
    		ioutil.WriteFile("images/" + v.FileName, bytes, 0644)
    		Newimage := &ProductImage{}
    		Newimage.Url = "https://hackathon.tokopedia.com/images/" + v.FileName
    		
    		NewProduct.Images = append(NewProduct.Images, Newimage)
    	}
    }

    InsertProduct(NewProduct)
	if NewProduct.Name != "" && NewProduct.Price != 0 && NewProduct.Description != "" {
		PushNotif(product.PushEndpoint)
	}
	response := &Response{}
	response.Data = NewProduct
	

	Render(w, req, response, 202)
}

func PushNotif(endpoint string) {
	var jsonStr = []byte(`{"to":"`+ endpoint +`"}`)
	req, err := http.NewRequest("POST", "https://gcm-http.googleapis.com/gcm/send", bytes.NewBuffer(jsonStr))
	if err != nil {
		log.Println(err)
	}
	req.Header.Set("Content-Type","application/json")
	req.Header.Set("Authorization","key=AIzaSyAj_dVLSgjwrtXJdMyLDSpYfVSZGOOb0h4")
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	fmt.Println("response Status:", resp.Status)
	fmt.Println("response Headers:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))
}


func OptionsAuth(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET,PATCH,DELETE,OPTIONS,POST")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Origin")
        w.WriteHeader(http.StatusOK)
}

func Ping(w http.ResponseWriter, req *http.Request, params httprouter.Params) {
	w.Header().Set("Content-Type", "application/json")
        w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write([]byte("pong"))
}

func Render(w http.ResponseWriter, req *http.Request, data interface{}, code int) {
	b, err := json.Marshal(data)
	if err != nil {
		return
	}

	callback := req.FormValue("callback")

	if callback != "" {
		w.Header().Set("Content-Type", "text/javascript")
		fmt.Fprintf(w, "%s(%s)", callback, b)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(code)
	w.Write(b)
}
