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
    NewProduct.Price 			= product.Price
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
    		Newimage.Url = "http://192.168.56.102:8080/images/" + v.FileName
    		
    		NewProduct.Images = append(NewProduct.Images, Newimage)
    	}
    }

    InsertProduct(NewProduct)


	response := &Response{}
	response.Data = NewProduct
	

	Render(w, req, response, 202)
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
