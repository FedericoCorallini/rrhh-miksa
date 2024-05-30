package com.miksa.hr;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.sql.DataSource;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@SpringBootApplication
public class HrApplication {
	@Resource
	private DataSource dataSource;

	@PostConstruct
	public void loadData() {
		try (Connection connection = dataSource.getConnection();
			 Statement statement = connection.createStatement();
			 FileReader fileReader = new FileReader("src/main/resources/data.sql")) {

			BufferedReader reader = new BufferedReader(fileReader);
			String line;

			while ((line = reader.readLine()) != null) {
				statement.executeUpdate(line);
			}

		} catch (SQLException | IOException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(HrApplication.class, args);
	}

}
