import fetch from 'isomorphic-fetch'
import {formatDate} from '../../helpers/dateUtils'

var tempData = {"away_team":{"team_id":"boston-red-sox","abbreviation":"BOS","active":true,"first_name":"Boston","last_name":"Red Sox","conference":"American","division":"East","site_name":"Fenway Park","city":"Boston","state":"Massachusetts","full_name":"Boston Red Sox"},"home_team":{"team_id":"kansas-city-royals","abbreviation":"KC","active":true,"first_name":"Kansas City","last_name":"Royals","conference":"American","division":"Central","site_name":"Kauffman Stadium","city":"Kansas City","state":"Missouri","full_name":"Kansas City Royals"},"away_period_scores":[0,0,0,1,1,0,0,0,0],"home_period_scores":[2,0,0,0,0,1,0,0,-1],"away_errors":0,"home_errors":0,"away_batters":[{"last_name":"Betts","first_name":"Markus","display_name":"Mookie Betts","position":"RF","bat_order":1,"sub_bat_order":0,"sacrifices":0,"at_bats":4,"plate_appearances":4,"singles":0,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":0,"runs":0,"hits":0,"rbi":0,"walks":0,"strike_outs":2,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"BOS","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0,"obp":0,"slg":0,"ops":0,"stolen_base_average":0,"strikeout_rate":0.5,"ops_string":".000","slg_string":".000","obp_string":".000","avg_string":".000","batting_highlights":"0-4"},{"last_name":"Pedroia","first_name":"Dustin","display_name":"Dustin Pedroia","position":"2B","bat_order":2,"sub_bat_order":0,"sacrifices":0,"at_bats":3,"plate_appearances":4,"singles":0,"doubles":1,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":2,"runs":1,"hits":1,"rbi":0,"walks":1,"strike_outs":0,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"BOS","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0.25,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":1,"avg":0.333,"obp":0.5,"slg":0.667,"ops":1.167,"stolen_base_average":0,"strikeout_rate":0,"ops_string":"1.167","slg_string":".667","obp_string":".500","avg_string":".333","batting_highlights":"1-3, R, 2B"},{"last_name":"Bogaerts","first_name":"Xander","display_name":"Xander Bogaerts","position":"SS","bat_order":3,"sub_bat_order":0,"sacrifices":0,"at_bats":4,"plate_appearances":4,"singles":2,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":2,"runs":0,"hits":2,"rbi":0,"walks":0,"strike_outs":1,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"BOS","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0.5,"obp":0.5,"slg":0.5,"ops":1,"stolen_base_average":0,"strikeout_rate":0.25,"ops_string":"1.000","slg_string":".500","obp_string":".500","avg_string":".500","batting_highlights":"2-4"},{"last_name":"Ortiz","first_name":"David","display_name":"David Ortiz","position":"DH","bat_order":4,"sub_bat_order":0,"sacrifices":0,"at_bats":4,"plate_appearances":4,"singles":3,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":3,"runs":0,"hits":3,"rbi":1,"walks":0,"strike_outs":0,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"BOS","at_bats_per_home_run":0,"at_bats_per_rbi":4,"walk_rate":0,"plate_appearances_per_rbi":4,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0.75,"obp":0.75,"slg":0.75,"ops":1.5,"stolen_base_average":0,"strikeout_rate":0,"ops_string":"1.500","slg_string":".750","obp_string":".750","avg_string":".750","batting_highlights":"3-4, RBI"},{"last_name":"Shaw","first_name":"Travis","display_name":"Travis Shaw","position":"1B","bat_order":5,"sub_bat_order":0,"sacrifices":0,"at_bats":4,"plate_appearances":4,"singles":1,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":1,"runs":0,"hits":1,"rbi":0,"walks":0,"strike_outs":2,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"BOS","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0.25,"obp":0.25,"slg":0.25,"ops":0.5,"stolen_base_average":0,"strikeout_rate":0.5,"ops_string":".500","slg_string":".250","obp_string":".250","avg_string":".250","batting_highlights":"1-4"},{"last_name":"Rutledge","first_name":"Joshua","display_name":"Josh Rutledge","position":"3B","bat_order":6,"sub_bat_order":0,"sacrifices":0,"at_bats":3,"plate_appearances":3,"singles":0,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":0,"runs":0,"hits":0,"rbi":0,"walks":0,"strike_outs":3,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"BOS","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0,"obp":0,"slg":0,"ops":0,"stolen_base_average":0,"strikeout_rate":1,"ops_string":".000","slg_string":".000","obp_string":".000","avg_string":".000","batting_highlights":"0-3"},{"last_name":"Holt","first_name":"Brock","display_name":"Brock Holt","position":"PH","bat_order":6,"sub_bat_order":1,"sacrifices":0,"at_bats":1,"plate_appearances":1,"singles":0,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":0,"runs":0,"hits":0,"rbi":0,"walks":0,"strike_outs":0,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"BOS","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0,"obp":0,"slg":0,"ops":0,"stolen_base_average":0,"strikeout_rate":0,"ops_string":".000","slg_string":".000","obp_string":".000","avg_string":".000","batting_highlights":"0-1"},{"last_name":"Bradley","first_name":"Jackie","display_name":"Jackie Bradley Jr.","position":"CF","bat_order":7,"sub_bat_order":0,"sacrifices":0,"at_bats":4,"plate_appearances":4,"singles":1,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":1,"runs":0,"hits":1,"rbi":0,"walks":0,"strike_outs":1,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"BOS","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0.25,"obp":0.25,"slg":0.25,"ops":0.5,"stolen_base_average":0,"strikeout_rate":0.25,"ops_string":".500","slg_string":".250","obp_string":".250","avg_string":".250","batting_highlights":"1-4"},{"last_name":"Young","first_name":"Christopher","display_name":"Chris Young","position":"LF","bat_order":8,"sub_bat_order":0,"sacrifices":0,"at_bats":3,"plate_appearances":3,"singles":0,"doubles":0,"triples":0,"home_runs":1,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":4,"runs":1,"hits":1,"rbi":1,"walks":0,"strike_outs":2,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"BOS","at_bats_per_home_run":3,"at_bats_per_rbi":3,"walk_rate":0,"plate_appearances_per_rbi":3,"plate_appearances_per_home_run":3,"extra_base_hits":1,"avg":0.333,"obp":0.333,"slg":1.333,"ops":1.666,"stolen_base_average":0,"strikeout_rate":0.667,"ops_string":"1.666","slg_string":"1.333","obp_string":".333","avg_string":".333","batting_highlights":"1-3, HR, R, RBI"},{"last_name":"Hernández","first_name":"Marco","display_name":"Marco Hernández","position":"PH","bat_order":8,"sub_bat_order":1,"sacrifices":0,"at_bats":1,"plate_appearances":1,"singles":0,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":0,"runs":0,"hits":0,"rbi":0,"walks":0,"strike_outs":0,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"BOS","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0,"obp":0,"slg":0,"ops":0,"stolen_base_average":0,"strikeout_rate":0,"ops_string":".000","slg_string":".000","obp_string":".000","avg_string":".000","batting_highlights":"0-1"},{"last_name":"Hanigan","first_name":"Ryan","display_name":"Ryan Hanigan","position":"C","bat_order":9,"sub_bat_order":0,"sacrifices":0,"at_bats":3,"plate_appearances":3,"singles":0,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":0,"runs":0,"hits":0,"rbi":0,"walks":0,"strike_outs":2,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"BOS","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0,"obp":0,"slg":0,"ops":0,"stolen_base_average":0,"strikeout_rate":0.667,"ops_string":".000","slg_string":".000","obp_string":".000","avg_string":".000","batting_highlights":"0-3"},{"last_name":"Ramírez","first_name":"Hanley","display_name":"Hanley Ramírez","position":"PH","bat_order":9,"sub_bat_order":1,"sacrifices":0,"at_bats":1,"plate_appearances":1,"singles":0,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":0,"runs":0,"hits":0,"rbi":0,"walks":0,"strike_outs":0,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"BOS","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0,"obp":0,"slg":0,"ops":0,"stolen_base_average":0,"strikeout_rate":0,"ops_string":".000","slg_string":".000","obp_string":".000","avg_string":".000","batting_highlights":"0-1"}],"home_batters":[{"last_name":"Escobar","first_name":"Alcides","display_name":"Alcides Escobar","position":"SS","bat_order":1,"sub_bat_order":0,"sacrifices":0,"at_bats":4,"plate_appearances":4,"singles":2,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":2,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":2,"runs":1,"hits":2,"rbi":0,"walks":0,"strike_outs":0,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"KC","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0.5,"obp":0.5,"slg":0.5,"ops":1,"stolen_base_average":1,"strikeout_rate":0,"ops_string":"1.000","slg_string":".500","obp_string":".500","avg_string":".500","batting_highlights":"2-4, R, 2 SB"},{"last_name":"Cain","first_name":"Lorenzo","display_name":"Lorenzo Cain","position":"CF","bat_order":2,"sub_bat_order":0,"sacrifices":1,"at_bats":3,"plate_appearances":4,"singles":0,"doubles":0,"triples":0,"home_runs":0,"sac_flies":1,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":0,"runs":0,"hits":0,"rbi":1,"walks":0,"strike_outs":2,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"KC","at_bats_per_home_run":0,"at_bats_per_rbi":3,"walk_rate":0,"plate_appearances_per_rbi":4,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0,"obp":0,"slg":0,"ops":0,"stolen_base_average":0,"strikeout_rate":0.667,"ops_string":".000","slg_string":".000","obp_string":".000","avg_string":".000","batting_highlights":"0-3, RBI"},{"last_name":"Hosmer","first_name":"Eric","display_name":"Eric Hosmer","position":"1B","bat_order":3,"sub_bat_order":0,"sacrifices":0,"at_bats":3,"plate_appearances":3,"singles":0,"doubles":0,"triples":0,"home_runs":1,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":4,"runs":1,"hits":1,"rbi":2,"walks":0,"strike_outs":0,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"KC","at_bats_per_home_run":3,"at_bats_per_rbi":1.5,"walk_rate":0,"plate_appearances_per_rbi":1.5,"plate_appearances_per_home_run":3,"extra_base_hits":1,"avg":0.333,"obp":0.333,"slg":1.333,"ops":1.666,"stolen_base_average":0,"strikeout_rate":0,"ops_string":"1.666","slg_string":"1.333","obp_string":".333","avg_string":".333","batting_highlights":"1-3, HR, R, 2 RBI"},{"last_name":"Morales","first_name":"Kendrys","display_name":"Kendrys Morales","position":"DH","bat_order":4,"sub_bat_order":0,"sacrifices":0,"at_bats":3,"plate_appearances":3,"singles":0,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":0,"runs":0,"hits":0,"rbi":0,"walks":0,"strike_outs":0,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"KC","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0,"obp":0,"slg":0,"ops":0,"stolen_base_average":0,"strikeout_rate":0,"ops_string":".000","slg_string":".000","obp_string":".000","avg_string":".000","batting_highlights":"0-3"},{"last_name":"Gordon","first_name":"Alexander","display_name":"Alex Gordon","position":"LF","bat_order":5,"sub_bat_order":0,"sacrifices":0,"at_bats":3,"plate_appearances":3,"singles":0,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":0,"runs":0,"hits":0,"rbi":0,"walks":0,"strike_outs":1,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"KC","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0,"obp":0,"slg":0,"ops":0,"stolen_base_average":0,"strikeout_rate":0.333,"ops_string":".000","slg_string":".000","obp_string":".000","avg_string":".000","batting_highlights":"0-3"},{"last_name":"Cuthbert","first_name":"Cheslor","display_name":"Cheslor Cuthbert","position":"3B","bat_order":6,"sub_bat_order":0,"sacrifices":0,"at_bats":3,"plate_appearances":3,"singles":1,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":1,"runs":0,"hits":1,"rbi":0,"walks":0,"strike_outs":1,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"KC","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0.333,"obp":0.333,"slg":0.333,"ops":0.666,"stolen_base_average":0,"strikeout_rate":0.333,"ops_string":".666","slg_string":".333","obp_string":".333","avg_string":".333","batting_highlights":"1-3"},{"last_name":"Colón","first_name":"Christian","display_name":"Christian Colón","position":"2B","bat_order":7,"sub_bat_order":0,"sacrifices":0,"at_bats":2,"plate_appearances":3,"singles":0,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":0,"runs":0,"hits":0,"rbi":0,"walks":1,"strike_outs":0,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"KC","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0.333,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0,"obp":0.333,"slg":0,"ops":0.333,"stolen_base_average":0,"strikeout_rate":0,"ops_string":".333","slg_string":".000","obp_string":".333","avg_string":".000","batting_highlights":"0-2"},{"last_name":"Butera","first_name":"Andrew","display_name":"Drew Butera","position":"C","bat_order":8,"sub_bat_order":0,"sacrifices":0,"at_bats":3,"plate_appearances":3,"singles":0,"doubles":0,"triples":0,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":0,"runs":0,"hits":0,"rbi":0,"walks":0,"strike_outs":1,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"KC","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":0,"avg":0,"obp":0,"slg":0,"ops":0,"stolen_base_average":0,"strikeout_rate":0.333,"ops_string":".000","slg_string":".000","obp_string":".000","avg_string":".000","batting_highlights":"0-3"},{"last_name":"Dyson","first_name":"Jarrod","display_name":"Jarrod Dyson","position":"RF","bat_order":9,"sub_bat_order":0,"sacrifices":0,"at_bats":3,"plate_appearances":3,"singles":0,"doubles":0,"triples":1,"home_runs":0,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":3,"runs":1,"hits":1,"rbi":0,"walks":0,"strike_outs":1,"left_on_base":0,"hit_by_pitch":0,"team_abbreviation":"KC","at_bats_per_home_run":0,"at_bats_per_rbi":0,"walk_rate":0,"plate_appearances_per_rbi":0,"plate_appearances_per_home_run":0,"extra_base_hits":1,"avg":0.333,"obp":0.333,"slg":1,"ops":1.333,"stolen_base_average":0,"strikeout_rate":0.333,"ops_string":"1.333","slg_string":"1.000","obp_string":".333","avg_string":".333","batting_highlights":"1-3, R, 3B"}],"away_pitchers":[{"last_name":"Wright","first_name":"Steven","display_name":"Steven Wright","pitch_order":1,"win":false,"loss":true,"save":false,"hold":false,"era":3.38,"whip":0.75,"innings_pitched":8,"hits_allowed":5,"runs_allowed":3,"earned_runs":3,"walks":1,"intentional_walks":0,"strike_outs":6,"home_runs_allowed":1,"pitch_count":101,"pitches_strikes":68,"wild_pitches":0,"hit_by_pitch":0,"team_abbreviation":"BOS","throwing_hand":"RHP"}],"home_pitchers":[{"last_name":"Kennedy","first_name":"Ian","display_name":"Ian Kennedy","pitch_order":1,"win":false,"loss":false,"save":false,"hold":false,"era":3.18,"whip":1.24,"innings_pitched":5.2,"hits_allowed":6,"runs_allowed":2,"earned_runs":2,"walks":1,"intentional_walks":0,"strike_outs":9,"home_runs_allowed":1,"pitch_count":116,"pitches_strikes":81,"wild_pitches":1,"hit_by_pitch":0,"team_abbreviation":"KC","throwing_hand":"RHP"},{"last_name":"Flynn","first_name":"Brian","display_name":"Brian Flynn","pitch_order":2,"win":true,"loss":false,"save":false,"hold":false,"era":0,"whip":0,"innings_pitched":0.1,"hits_allowed":0,"runs_allowed":0,"earned_runs":0,"walks":0,"intentional_walks":0,"strike_outs":1,"home_runs_allowed":0,"pitch_count":5,"pitches_strikes":3,"wild_pitches":0,"hit_by_pitch":0,"team_abbreviation":"KC","throwing_hand":"LHP"},{"last_name":"Hochevar","first_name":"Luke","display_name":"Luke Hochevar","pitch_order":3,"win":false,"loss":false,"save":false,"hold":true,"era":0,"whip":0,"innings_pitched":1,"hits_allowed":0,"runs_allowed":0,"earned_runs":0,"walks":0,"intentional_walks":0,"strike_outs":3,"home_runs_allowed":0,"pitch_count":13,"pitches_strikes":9,"wild_pitches":0,"hit_by_pitch":0,"team_abbreviation":"KC","throwing_hand":"RHP"},{"last_name":"Herrera","first_name":"Kelvin","display_name":"Kelvin Herrera","pitch_order":4,"win":false,"loss":false,"save":false,"hold":true,"era":0,"whip":2,"innings_pitched":1,"hits_allowed":2,"runs_allowed":0,"earned_runs":0,"walks":0,"intentional_walks":0,"strike_outs":0,"home_runs_allowed":0,"pitch_count":7,"pitches_strikes":6,"wild_pitches":0,"hit_by_pitch":0,"team_abbreviation":"KC","throwing_hand":"RHP"},{"last_name":"Davis","first_name":"Wade","display_name":"Wade Davis","pitch_order":5,"win":false,"loss":false,"save":true,"hold":false,"era":0,"whip":1,"innings_pitched":1,"hits_allowed":1,"runs_allowed":0,"earned_runs":0,"walks":0,"intentional_walks":0,"strike_outs":0,"home_runs_allowed":0,"pitch_count":9,"pitches_strikes":7,"wild_pitches":0,"hit_by_pitch":0,"team_abbreviation":"KC","throwing_hand":"RHP"}],"away_fielding":[{"last_name":"Bogaerts","first_name":"Xander","display_name":"Xander Bogaerts","errors":0,"team_abbreviation":"BOS"},{"last_name":"Bradley","first_name":"Jackie","display_name":"Jackie Bradley Jr.","errors":0,"team_abbreviation":"BOS"},{"last_name":"Wright","first_name":"Steven","display_name":"Steven Wright","errors":0,"team_abbreviation":"BOS"},{"last_name":"Holt","first_name":"Brock","display_name":"Brock Holt","errors":0,"team_abbreviation":"BOS"},{"last_name":"Ortiz","first_name":"David","display_name":"David Ortiz","errors":0,"team_abbreviation":"BOS"},{"last_name":"Pedroia","first_name":"Dustin","display_name":"Dustin Pedroia","errors":0,"team_abbreviation":"BOS"},{"last_name":"Betts","first_name":"Markus","display_name":"Mookie Betts","errors":0,"team_abbreviation":"BOS"},{"last_name":"Shaw","first_name":"Travis","display_name":"Travis Shaw","errors":0,"team_abbreviation":"BOS"},{"last_name":"Ramírez","first_name":"Hanley","display_name":"Hanley Ramírez","errors":0,"team_abbreviation":"BOS"},{"last_name":"Hanigan","first_name":"Ryan","display_name":"Ryan Hanigan","errors":0,"team_abbreviation":"BOS"},{"last_name":"Hernández","first_name":"Marco","display_name":"Marco Hernández","errors":0,"team_abbreviation":"BOS"},{"last_name":"Rutledge","first_name":"Joshua","display_name":"Josh Rutledge","errors":0,"team_abbreviation":"BOS"},{"last_name":"Young","first_name":"Christopher","display_name":"Chris Young","errors":0,"team_abbreviation":"BOS"}],"home_fielding":[{"last_name":"Herrera","first_name":"Kelvin","display_name":"Kelvin Herrera","errors":0,"team_abbreviation":"KC"},{"last_name":"Davis","first_name":"Wade","display_name":"Wade Davis","errors":0,"team_abbreviation":"KC"},{"last_name":"Escobar","first_name":"Alcides","display_name":"Alcides Escobar","errors":0,"team_abbreviation":"KC"},{"last_name":"Hosmer","first_name":"Eric","display_name":"Eric Hosmer","errors":0,"team_abbreviation":"KC"},{"last_name":"Cain","first_name":"Lorenzo","display_name":"Lorenzo Cain","errors":0,"team_abbreviation":"KC"},{"last_name":"Dyson","first_name":"Jarrod","display_name":"Jarrod Dyson","errors":0,"team_abbreviation":"KC"},{"last_name":"Colón","first_name":"Christian","display_name":"Christian Colón","errors":0,"team_abbreviation":"KC"},{"last_name":"Cuthbert","first_name":"Cheslor","display_name":"Cheslor Cuthbert","errors":0,"team_abbreviation":"KC"},{"last_name":"Flynn","first_name":"Brian","display_name":"Brian Flynn","errors":0,"team_abbreviation":"KC"},{"last_name":"Hochevar","first_name":"Luke","display_name":"Luke Hochevar","errors":0,"team_abbreviation":"KC"},{"last_name":"Morales","first_name":"Kendrys","display_name":"Kendrys Morales","errors":0,"team_abbreviation":"KC"},{"last_name":"Butera","first_name":"Andrew","display_name":"Drew Butera","errors":0,"team_abbreviation":"KC"},{"last_name":"Kennedy","first_name":"Ian","display_name":"Ian Kennedy","errors":0,"team_abbreviation":"KC"},{"last_name":"Gordon","first_name":"Alexander","display_name":"Alex Gordon","errors":0,"team_abbreviation":"KC"}],"officials":[{"position":"Home Plate","first_name":"Brian","last_name":"Knight"},{"position":"First Base","first_name":"Clint","last_name":"Fagan"},{"position":"Second Base","first_name":"Todd","last_name":"Tichenor"},{"position":"Third Base","first_name":"Bill","last_name":"Miller"}],"event_information":{"start_date_time":"2016-05-18T14:15:00-04:00","event_status":"completed","season_type":"regular","temperature":65,"site":{"capacity":40793,"surface":"Grass","name":"Kauffman Stadium","city":"Kansas City","state":"Missouri"},"attendance":33613,"duration":"2:23"},"away_batter_totals":{"sacrifices":0,"at_bats":35,"plate_appearances":36,"singles":7,"doubles":1,"triples":0,"home_runs":1,"sac_flies":0,"sac_hits":0,"stolen_bases":0,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":13,"runs":2,"hits":9,"rbi":2,"walks":1,"strike_outs":13,"left_on_base":0,"hit_by_pitch":0,"at_bats_per_home_run":35,"at_bats_per_rbi":17.5,"walk_rate":0.028,"plate_appearances_per_rbi":18,"plate_appearances_per_home_run":36,"extra_base_hits":2,"avg":0.257,"obp":0.278,"slg":0.371,"ops":0.649,"stolen_base_average":0,"strikeout_rate":0.371,"ops_string":".649","slg_string":".371","obp_string":".278","avg_string":".257","batting_highlights":"9-35, HR, 2 R, 2 RBI, 2B"},"home_batter_totals":{"sacrifices":1,"at_bats":27,"plate_appearances":29,"singles":3,"doubles":0,"triples":1,"home_runs":1,"sac_flies":1,"sac_hits":0,"stolen_bases":2,"caught_stealing":0,"rbi_with_two_outs":0,"total_bases":10,"runs":3,"hits":5,"rbi":3,"walks":1,"strike_outs":6,"left_on_base":0,"hit_by_pitch":0,"at_bats_per_home_run":27,"at_bats_per_rbi":9,"walk_rate":0.034,"plate_appearances_per_rbi":9.667,"plate_appearances_per_home_run":29,"extra_base_hits":2,"avg":0.185,"obp":0.207,"slg":0.37,"ops":0.577,"stolen_base_average":1,"strikeout_rate":0.222,"ops_string":".577","slg_string":".370","obp_string":".207","avg_string":".185","batting_highlights":"5-27, HR, 3 R, 3 RBI, 3B, 2 SB"}}

let initialState = {
	fetching: false,
	didInvalidate: false,
	boxscoreId: null,
	data: null,
	dataPlaceholder: tempData,
	adjustments: {}
}

export function requestBoxscores() {
	console.log('requesting boxscores')
	return { type: 'REQUEST_BOXSCORES' }
}

export function receiveBoxscores (boxscores, id) {
	return { type: 'RECEIVE_BOXSCORES', boxscores: boxscores, id: id }
}

export function fetchBoxscore(boxscoreId) {
	console.log('fetching...')


	return function (dispatch) {

		// dispatch(receiveBoxscores(tempData, '20160516-miami-marlins-at-philadelphia-phillies'))

		dispatch(requestBoxscores())

		var url = '/api/boxscore/' + boxscoreId //process.env.NODE_ENV === 'development' ? '/api/boxscores' : './data/boxscores.json'

		// console.log(url);

		return fetch(url)
			.then(function(response) {
				console.log(response)
				response.json().then(function(data) {
					// console.log('---about to receive', boxscoreId)
					dispatch(receiveBoxscores(data, boxscoreId))
				})
			})
	}
}

export function fetchBoxscoreIfNeeded(boxscoreId) {

	return (dispatch, getState) => {

		var state = getState()

		var boxscoreDateIsCurrentDate = (formatDate(new Date()) === formatDate(state.events.eventDate))

		if (!boxscoreId || boxscoreDateIsCurrentDate) {
			// console.log('not going to fetch boxscore')
			return Promise.resolve('No boxscore available for the requested game.')
		}

		// console.log('fetching boxscores')

		if (shouldFetchBoxscores(boxscoreId, state)) {
			// console.log('getting new boxscores')
			return dispatch(fetchBoxscore(boxscoreId))
		} else {
			// console.log('using old boxscores')
			// dispatch(receiveBoxscores(state.boxscores.data, boxscoreId))
			// Let the calling code know there's nothing to wait for.
			return Promise.resolve()
		}
	}
}

function shouldFetchBoxscores(boxscoreId, state) {
	var currentBoxscore = state.boxscores.data

	var boxscoreAlreadyFetched

	if (currentBoxscore) {
		if (boxscoreId === state.boxscores.boxscoreId) {
			// console.log('already have boxscore')
			boxscoreAlreadyFetched = true
		}
	}

	if ((!boxscoreAlreadyFetched && !state.boxscores.fetching)) {
		return true
	} else {
		return false
	}
}

export function adjustBoxscoreElementPosition(element, adjustment) {
	return { type: 'ADJUST_BOXSCORE_POSITION', adjustment, element }

}

export default function reducer (state = initialState, action) {
	var newState = state
	switch (action.type) {

		case 'REQUEST_BOXSCORES':
			newState = Object.assign({}, state, {
				fetching: true
			})
			break

		case 'RECEIVE_BOXSCORES':
			console.log('receiving boxscores', action.id, action.boxscores)
			newState = Object.assign({}, state, {
				fetching: false,
				boxscoreId: action.id,
				data: action.boxscores,
				adjustments: null
				// boxscoreLists: returnPlayerLists( action.boxscores )
			})
			// localStorage.setItem('AuctionToolPlayerList',JSON.stringify(newState.data))
			break

		case 'ADJUST_BOXSCORE_POSITION':

			var newAdjustments = Object.assign({}, state.adjustments, {
				[action.element]: action.adjustment
			})

			newState = Object.assign({}, state, {
				adjustments: newAdjustments
			})
			break

		/*case 'SET_BOXSCORE_ID':
			newState = Object.assign({}, state, {
				boxscoreId: action.id,
				didInvalidate: true
			})
			break*/

		default:
			break
	}
	return newState
}