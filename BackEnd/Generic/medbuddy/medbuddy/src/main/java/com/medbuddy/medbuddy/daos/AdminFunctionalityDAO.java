package com.medbuddy.medbuddy.daos;

@Repository
public class AdminFunctionalityDAO{
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AdminFunctionalityDAO(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate=jdbcTemplate;
    }

    public List<Integer> getOldestUsers(int fromId, int toId) {
        return jdbcTemplate.query("SELECT id FROM user WHERE id>=fromId AND id<=toId", new RowMapper());
    }

    public int reportUser(int currentUserId, int reportedUserId, String reportMessage) {
        return jdbcTemplate.update("INSERT INTO reports(REPORTEDUSER, REPORTEDBY, REPORTMESSAGE) VALUES (?, ?, ?)", reportedUserId, currentUserId, reportMessage);
    }

    public List<Report> getReports(int fromId, int toId) {
        return jdbcTemplate.query("SELECT reportedUser, reportedBy, reportMessage FROM reports WHERE id>=fromId AND id<=toId", new ReportRowMapper());
    }

    public bool allowMedic(int medicId)
    {
        // if(isValidCertificate)
            return true;
        // else
        //  return false;
    }

}