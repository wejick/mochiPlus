package main

import(
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

var dbMochi *sql.DB
var selectProductStmt, selectProductAllStmt, insertProductStmt, insertProductImageStmt,
	selectProductImageStmt, selectCurrvalStmt *sql.Stmt


func init() {
	var err error
	dbMochi, err = sql.Open("postgres", "postgres://postgres@localhost/mochi?sslmode=disable")
	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("connected to postgres!")
	}

	insertProductQuery := `
			INSERT INTO 
				PRODUCT (name, price, description)
			VALUES
				($1, $2, $3)
		`
	insertProductStmt, err = dbMochi.Prepare(insertProductQuery)
        if err != nil {
                log.Println(err)
        }


	selectProductQuery := `
			SELECT
				id
				, name
				, price
				, description
			FROM
				product
			WHERE
				id = $1
		`

	selectProductStmt, err = dbMochi.Prepare(selectProductQuery)
	if err != nil {
		log.Println(err)
	}

	selectProductAll := `
			SELECT
				id
				, name
				, price
				, description
			FROM
				product
			WHERE
				name <> ''
                                and description <> ''
                                and price <> '0'
		`

	selectProductAllStmt, err = dbMochi.Prepare(selectProductAll)
	if err != nil {
		log.Println(err)
	}

	
	insertProductImageQuery := `
			INSERT INTO 
				PRODUCT_IMAGE (product_id, url)
			VALUES
				($1, $2)
		`

	insertProductImageStmt, err = dbMochi.Prepare(insertProductImageQuery)
        if err != nil {
                log.Println(err)
        }


	selectProductImageQuery := `
			SELECT
				url
			FROM
				product_image
			WHERE
				product_id = $1
		`

	selectProductImageStmt, err = dbMochi.Prepare(selectProductImageQuery)
	if err != nil {
		log.Println(err)
	}

	selectCurrvalQuery := `
		select currval('product_seq');
	`

	selectCurrvalStmt, err = dbMochi.Prepare(selectCurrvalQuery)
	if err != nil {
		log.Println(err)
	}

}

func InsertProduct(product *Product) (*Product) {
	tx, err := dbMochi.Begin()
	if err != nil {
		log.Println(err)
	}

	result, err := tx.Stmt(insertProductStmt).Exec(product.Name, product.Price, product.Description)
	if err != nil {
		tx.Rollback()
		log.Println(err)
		return nil
	}
	

	if result != nil {
		product.Id = GetLastInsertId(tx)
		if product.Id != 0 {
			for _, v := range product.Images {
				tx.Stmt(insertProductImageStmt).Exec(product.Id, v.Url)
			}
		}
	}	

	tx.Commit()

	return product
}

func GetProduct(productId int) *Product {
	rows, err := selectProductStmt.Query(productId)
	if err != nil {
		log.Println(err)
	}

	if rows.Next() {
		product := &Product{}
		rows.Scan(&product.Id, &product.Name, &product.Price, &product.Description)

		product.Images = GetImages(product.Id)
		return product
	}

	return nil
}

func GetProductAll() []*Product {
	products := []*Product{}

	rows, err := selectProductAllStmt.Query()
	if err != nil {
		log.Println(err)
	}

	for rows.Next() {
		product := &Product{}

		rows.Scan(&product.Id, &product.Name, &product.Price, &product.Description)
		product.Images = GetImages(product.Id)

		products = append(products, product)
	}

	return products
}

func GetImages(productId int) []*ProductImage {
	productImages := []*ProductImage{}

	rows, err := selectProductImageStmt.Query(productId)
	if err != nil {
		log.Println(err)
	}

	for rows.Next() {
		productImage := &ProductImage{}
		rows.Scan(&productImage.Url)

		productImages = append(productImages, productImage)
	}

	return productImages
}

func GetLastInsertId(tx *sql.Tx) int {
	rows, err := tx.Stmt(selectCurrvalStmt).Query()
	if err != nil {
		log.Println(err)
	}

	if rows.Next() {
		var id int
		rows.Scan(&id)

		return id
	}
	return 0
}
