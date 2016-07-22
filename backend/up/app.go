package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func main() {
	router := httprouter.New()

	router.GET("/product/list", GetProductList)
	router.GET("/product/detail/:id", GetProductDetail)

	router.POST("/product/upload", ProductUpload)

	http.ListenAndServe(":8080", router)
}