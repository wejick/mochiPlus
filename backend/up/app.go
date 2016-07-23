package main

import (
	"net/http"
	"log"

	"github.com/julienschmidt/httprouter"
)

func OptionsAuth(w http.ResponseWriter, r *http.Request, params httprouter.Params) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET,PATCH,DELETE,OPTIONS,POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Origin")
	w.WriteHeader(http.StatusOK)
}

func main() {
	router := httprouter.New()

	router.GET("/api/product/list", GetProductList)
	router.GET("/api/product/detail/:id", GetProductDetail)

	router.POST("/api/product/upload", ProductUpload)
//	router.POST("/notify", PushNotif)
	router.OPTIONS("/api/product/upload", OptionsAuth)


	router.ServeFiles("/images/*filepath", http.Dir("images/"))

	port := ":8080"

	log.Println("Started at ", port)
	http.ListenAndServe(port, router)
}
