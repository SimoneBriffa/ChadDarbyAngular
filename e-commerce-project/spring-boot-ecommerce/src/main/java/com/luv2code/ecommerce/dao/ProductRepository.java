package com.luv2code.ecommerce.dao;

import com.luv2code.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {

    /* METODO PER TROVARE I PRODOTTI IN BASE ALLA CATEGORIA
    questo metodo non ha bisogno di implementazione perchè è automatizzato;
    "findBy" è un metodo della JpaRepository quindi questo metodo genererà una
    query del tipo SELECT * FROM products WHERE id=?
     */

    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    /* METODO PER CERCARE I PRODOTTI DALLA BARRA DI RICERCA
     *
     * Spring eseguirà una query del tipo:
     * SELECT * FROM Product p WHERE p.name LIKE CONCAT('%', :name, '%')
     * cioè prodotti che contengono la parola "name"*/

    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pageable);


}
