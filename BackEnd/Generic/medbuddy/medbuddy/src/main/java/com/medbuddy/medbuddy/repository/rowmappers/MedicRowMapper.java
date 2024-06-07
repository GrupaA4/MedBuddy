package com.medbuddy.medbuddy.repository.rowmappers;

import com.medbuddy.medbuddy.models.Medic;
import com.medbuddy.medbuddy.utilitaries.DataConvertorUtil;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;

public class MedicRowMapper implements RowMapper<Medic> {
    @Override
    public Medic mapRow(ResultSet rs, int rowNum) throws SQLException {
        Medic medic = new Medic();
        medic.setId(UUID.fromString(rs.getString("userId")));
        medic.setMedicId(UUID.fromString(rs.getString("id")));
        medic.setTypeOfMedic(rs.getString("typeOfMedic"));
        medic.setClinic(rs.getString("clinic"));
        medic.setCertificateImageNumber(rs.getInt("certificateImageNumber"));
        medic.setCertificateExtension(rs.getString("imageExtension"));
        medic.setApproved(DataConvertorUtil.turn0or1intoBoolean(rs.getInt("isApproved")));
        return medic;
    }
}
