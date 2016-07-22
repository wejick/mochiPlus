package main

type(
	Product struct {
		Id 				int
		Name 			string
		Image 			[]*ProductImage
		Price 			string
		Description 	string
	}

	ProductImage struct {
		Url 		string
	}


	Response struct {
		Data 	interface{} `json:"data"`
	}
)