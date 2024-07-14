package main

import (
	"net/http"

	"naws/lambda"
	"naws/utils"
)

func main() {
	http.HandleFunc("/", utils.LambdaProxy(lambda.Hello))
	http.ListenAndServe(":8080", nil)
}
