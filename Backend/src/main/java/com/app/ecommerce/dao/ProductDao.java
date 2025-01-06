package com.app.ecommerce.dao;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.ecommerce.entity.Product;

@Repository
public interface ProductDao extends CrudRepository<Product,Integer>{
	public List<Product> findAll(Pageable pageable);
	
	@Query("SELECT p FROM Product p WHERE " +
	           "(:productName IS NULL OR LOWER(p.productName) LIKE LOWER(CONCAT('%', :productName, '%'))) OR " +
	           "(:category IS NULL OR LOWER(p.productCategory) LIKE LOWER(CONCAT('%', :category, '%'))) OR " +
	           "(:minPrice IS NULL OR p.productActualPrice >= :minPrice) AND " +
	           "(:maxPrice IS NULL OR p.productActualPrice <= :maxPrice)")
	    List<Product> searchProducts(
	        @Param("productName") String productName,
	        @Param("category") String category,
	        @Param("minPrice") Double minPrice,
	        @Param("maxPrice") Double maxPrice,
	        Pageable pageable
	    );
	
	public List<Product> findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(String key1,String key2,Pageable pageable);
	
	public List<Product> findByProductCategoryIgnoreCase(String key1,Pageable pageable);
	
	@Query("SELECT p FROM Product p WHERE " +
			"(:minPrice IS NULL OR p.productActualPrice >= :minPrice) AND " +
	           "(:maxPrice IS NULL OR p.productActualPrice <= :maxPrice)")
	    List<Product> searchByRange(
		@Param("minPrice") Double minPrice,
        @Param("maxPrice") Double maxPrice,
        Pageable pageable
    );
	
	@Query("SELECT p FROM Product p WHERE " +
	           "(:category IS NULL OR LOWER(p.productCategory) LIKE LOWER(CONCAT(:category))) AND " +
	           "(:minPrice IS NULL OR p.productActualPrice >= :minPrice) AND " +
	           "(:maxPrice IS NULL OR p.productActualPrice <= :maxPrice)")
	    List<Product> searchByCategoryRange(
	        @Param("category") String category,
	        @Param("minPrice") Double minPrice,
	        @Param("maxPrice") Double maxPrice,
	        Pageable pageable
	    );
	    		
	@Modifying
    @Query("UPDATE Product p SET p.availability = :status WHERE p.id = :productId")
    void updateProductAvailability(@Param("productId") Integer productId, @Param("status") String status);

}
