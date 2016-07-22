package main

type(
	Product struct {
		Id 				int 				`json:"id"`
		Name 			string  			`json:"name"`
		Images 			[]*ProductImage 	`json:"images"`
		Price 			int 				`json:"price"`
		Description 	string 				`json:"description"`
	}

	ProductImage struct {
		Url 		string 					`json:"url"`
	}


	Response struct {
		Data 	interface{} 				`json:"data"`
	}


	//For encode
	ProductForm struct {
		Id 				int 				`json:"id,omitempty"`
		Name 			string  			`json:"name,omitempty"`
		Images 			[]*ProductImageForm 	`json:"images,omitempty"`
		Price 			int 				`json:"price,omitempty"`
		Description 	string 				`json:"description,omitempty"`
	}

	ProductImageForm struct {
		File 		string 					`json:"file,omitempty"`
		FileName 	string 					`json:"file_name,omitempty"`
	}
)