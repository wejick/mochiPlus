package main

import (
	"net/http"
	"log"

	"github.com/julienschmidt/httprouter"
)

func main() {
	router := httprouter.New()

	router.GET("/api/product/list", GetProductList)
	router.GET("/api/product/detail/:id", GetProductDetail)

	router.POST("/api/product/upload", ProductUpload)
//	router.POST("/notify", PushNotif)


	router.ServeFiles("/images/*filepath", http.Dir("images/"))

	port := ":8080"

	log.Println("Started at ", port)
	http.ListenAndServe(port, router)
}
