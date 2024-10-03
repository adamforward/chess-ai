use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use std::sync::Mutex;
use serde::Deserialize;
use std::collections::HashMap;

#[derive(Deserialize)]
struct UserRequest {
    user_id: String,
    pgn: String, // This will be the move provided by the user
}

struct AppState {
    user_state: Mutex<HashMap<String, usize>>, // Stores the index of the last move for each user
    games: Vec<Vec<&'static str>>, // Predefined list of moves
}

fn get_games() -> Vec<Vec<&'static str>> {
    vec![
        vec!["d2d4", "g8f6", "g1f3", "d7d5", "e2e3", "c8f5", "c2c4", "c7c6", "b1c3", "e7e6", "f1d3", "f5d3", "d1d3", "b8d7", "b2b3", "f8d6", "e1g1", "e8g8", "c1b2", "d8e7", "a1d1", "a8d8", "f1e1", "d5c4", "b3c4", "e6e5", "d4e5", "d7e5", "f3e5", "d6e5", "d3e2", "d8d1", "e1d1", "f8d8", "d1d8", "e7d8", "e2d1", "d8d1", "c3d1", "e5b2", "d1b2", "b7b5", "f2f3", "g8f8", "g1f2", "f8e7"],
    
    vec!["e2e4", "g8f6", "e4e5", "f6d5", "d2d4", "d7d6", "g1f3", "c8g4", "f1c4", "e7e6", "e1g1", "d5b6", "c4e2", "f8e7", "h2h3", "g4h5", "c1f4", "b8c6", "c2c3", "e8g8", "b1d2", "d6d5", "b2b4", "a7a5", "a2a3", "d8d7", "d1c2", "h5g6", "e2d3", "f8c8", "f1b1", "e7f8", "h3h4", "c6e7", "g2g3", "d7a4", "f3e1", "a4c2", "d3c2", "g6c2", "e1c2", "b6a4", "b1b3", "b7b6", "g1f1", "c7c5", "b4c5", "b6c5", "d4c5", "c8c5", "d2b1", "a8c8", "f4e3", "c5c4", "e3d4", "e7c6", "b3b5", "c6d4", "c2d4", "a4c3", "b1c3", "c4d4", "c3e2", "d4a4", "f1e1", "a4a3", "a1b1", "f8b4", "e1f1", "a3d3"],
    
    vec!["e2e4", "e7e6", "d2d4", "d7d5", "b1c3", "f8b4", "e4e5", "g8e7", "a2a3", "b4c3", "b2c3", "b7b6", "d1g4", "e7f5", "f1d3", "h7h5", "g4h3", "c7c5", "d3f5", "e6f5", "h3g3", "e8f8", "h2h4", "b8c6", "c1g5", "f7f6", "e5f6", "g7f6", "g5e3", "d8e7", "g1e2", "c8e6", "e1g1", "f8f7", "e2f4", "a8g8", "g3f3", "e7d7", "a1d1", "c5c4", "f1e1", "g8g4", "g2g3", "f7f8", "f4e6", "d7e6", "e3h6", "f8f7", "e1e6", "f7e6", "h6f4", "c6e7", "d1e1", "e6d7", "f3e3"],
    
    vec!["d2d4", "d7d5", "c2c4", "e7e6", "b1c3", "g8f6", "e2e3", "f8e7", "g1f3", "e8g8", "f1d3", "b8d7", "e3e4", "d5e4", "c3e4", "f6e4", "d3e4", "d7f6", "e4c2", "e7b4", "c1d2", "b4d2", "d1d2", "b7b6", "e1g1", "c8b7", "f3e5", "f6d7", "d2d3", "g7g6", "e5d7", "d8d7", "b2b3", "a8d8", "a1d1", "c7c5", "d4c5", "d7d3", "d1d3", "d8d3", "c2d3", "b6c5", "f1d1", "f8d8", "f2f3", "e6e5", "g1f2", "e5e4", "d3e2", "d8d1", "e2d1", "g8f8", "f3e4", "b7e4", "a2a3", "a7a5", "g2g3", "f8e7", "f2e3"],
    
    vec!["e2e4", "c7c5", "g1f3", "b8c6", "d2d4", "c5d4", "f3d4", "e7e5", "d4b5", "d7d6", "b1c3", "a7a6", "b5a3", "b7b5", "c3d5", "g8e7", "c2c4", "c6d4", "c4b5", "e7d5", "e4d5", "c8d7", "c1e3", "a6b5", "e3d4", "e5d4", "d1d4", "f8e7", "a3b5", "e8g8", "b5c3", "e7f6", "d4d2", "f8e8", "f1e2", "f6c3", "d2c3", "d7b5", "e1g1", "e8e2", "f1e1", "e2e1", "c3e1", "b5c4"],
    ]
}


async fn handle_move_request(data: web::Data<AppState>, query: web::Json<UserRequest>) -> impl Responder {
    println!("HERE WHAT ?");

    let user_id = &query.user_id;
    let user_id_int:usize;
    if user_id=="1"{
        user_id_int=0
    }
    else if user_id=="2"{
        user_id_int=1
    }
    else if user_id=="3"{
        user_id_int=2
    }
    else if user_id=="4"{
        user_id_int=3
    }
    else if user_id=="5"{
        user_id_int=4
    }
    else{
        user_id_int=0
    }

    println!("user_id_int is {}", user_id_int);

    let user_move = &query.pgn;

    println!("user_move is {}", user_move);

    let mut state = data.user_state.lock().unwrap();
    let games = &data.games;

    // Get the user's current index, or start at 0 if this is their first move
    let user_index = state.entry(user_id.clone()).or_insert(0);

    // Check if all moves are exhausted for the user
    if *user_index >= games[user_id_int].len() {
        return HttpResponse::Ok().json("All moves exhausted");
    }
    

    // Check if the provided move matches the expected move
    if *user_index==0 && user_move==""{
        let next_move = games[user_id_int][*user_index].to_string();
        *user_index += 1;
        println!("next move for testing is {}", games[user_id_int][*user_index]);
        return HttpResponse::Ok().json(next_move);
    }

    if games[user_id_int][*user_index] == user_move {
        // Increment the index and return the next move
        *user_index += 1;
        if *user_index < games[user_id_int].len() {
            let next_move = games[user_id_int][*user_index].to_string();
            *user_index += 1;
            println!("next move for testing is {}", games[user_id_int][*user_index]);
            return HttpResponse::Ok().json(next_move); // Respond with the next move
        } else {
            return HttpResponse::Ok().json("All moves sent");
        }
    } else {
        // If the move does not match, return an error
        return HttpResponse::BadRequest().json("Invalid move");
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let state = web::Data::new(AppState {
        user_state: Mutex::new(HashMap::new()), // Tracks the last move index for each user
        games: get_games(), // Predefined chess games
    });

    println!("Server is running on port 8080");

    HttpServer::new(move || {
        App::new()
            .app_data(state.clone()) // Share state between requests
            .route("/next_move", web::post().to(handle_move_request)) // Handle the move request
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
