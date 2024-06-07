package com.medbuddy.medbuddy.tests.UtilsTests;

import com.medbuddy.medbuddy.exceptions.DatabaseExceptions;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DataConvertorUtilTests {

    @Test
    public void turn0or1intoBoolean_for0_ShouldReturnFalse() {
        assertThat(DataConvertorUtil.turn0or1intoBoolean(0)).isFalse();
    }

    @Test
    public void turn0or1intoBoolean_for1_ShouldReturnTrue() {
        assertThat(DataConvertorUtil.turn0or1intoBoolean(1)).isTrue();
    }

    @Test
    public void turn0or1intoBoolean_forInvalidValue_ShouldThrowException() {
        assertThrows(DatabaseExceptions.BooleanProblemInDatabase.class, () -> DataConvertorUtil.turn0or1intoBoolean(6));
    }

    @Test
    public void turnBooleanInto0or1_forFalse_ShouldReturn0() {
        assertEquals(DataConvertorUtil.turnBooleanInto0or1(false), 0);
    }

    @Test
    public void turnBooleanInto0or1_forTrue_ShouldReturn1() {
        assertEquals(DataConvertorUtil.turnBooleanInto0or1(true), 1);
    }

    @Test
    public void turnDotDateToLocalDate_forValidInput_ShouldConvertStringToLocalDate() {
        LocalDate expectedDate = LocalDate.of(2020, 1, 1);
        assertEquals(DataConvertorUtil.turnDotDateToLocalDate("01.01.2020"), expectedDate);
    }

    @Test
    public void turnDotDateToLocalDate_forInvalidFormat_ShouldThrowException() {
        assertThrows(DateTimeParseException.class, () -> DataConvertorUtil.turnDotDateToLocalDate("1.1.2020"));
    }

    @Test
    public void turnLocalDateToDotDate_forLocalDate_ShouldReturnTheStringValueOfTheDateWithDotSeparation() {
        assertEquals(DataConvertorUtil.turnLocalDateToDotDate(LocalDate.of(2020, 1, 1)), "01.01.2020");
    }

    @Test
    public void turnSlashDateToLocalDate_forValidInput_ShouldConvertStringToLocalDate() {
        LocalDate expectedDate = LocalDate.of(2020, 1, 1);
        assertEquals(DataConvertorUtil.turnSlashDateToLocalDate("01/01/2020"), expectedDate);
    }

    @Test
    public void turnSlashDateToLocalDate_forInvalidFormat_ShouldThrowException() {
        assertThrows(DateTimeParseException.class, () -> DataConvertorUtil.turnSlashDateToLocalDate("1/1/2020"));
    }

    @Test
    public void turnLocalDateToSlashDate_forLocalDate_ShouldReturnTheStringValueOfTheDateWithSlashSeparation() {
        assertEquals(DataConvertorUtil.turnLocalDateToSlashDate(LocalDate.of(2020, 1, 1)), "01/01/2020");
    }
}
