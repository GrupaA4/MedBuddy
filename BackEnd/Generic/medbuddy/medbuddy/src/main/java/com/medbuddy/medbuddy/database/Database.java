package com.medbuddy.medbuddy.database;

//Might be a bit scuffed
//Subject to structural modification if complaints arise

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Database {
    private static final String URL =
            "jdbc:oracle:thin:@localhost:1521:XE";
    private static final String USER = "Medbuddy";
    private static final String PASSWORD = "Medbuddy";
    private static Connection connection = null;

    private Database() {
    }

    public static Connection getConnection() {
        return connection;
    }

    public static void createConnection() {
        try {
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
            //Might have to set this to true because the db is a bit finicky without commits
            //Should be discussed as I'm not very sure
            connection.setAutoCommit(false);
        } catch (SQLException e) {
            System.err.println(e);
        }
    }

    public static void closeConnection() throws SQLException {
        connection.close();
    }
}
