use axum::Server;
use std::net::SocketAddr;
use std::sync::Arc;

use application::user_service::UserService;
use infrastructure::repository::InMemoryUserRepository;
use interface::routes::create_routes;

mod application;
mod domain;
mod infrastructure;
mod interface;

#[tokio::main]
async fn main() {
    let repository = InMemoryUserRepository::new();
    let user_service = Arc::new(UserService::new(repository));

    let app = create_routes(user_service);

    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Server running on http://{}", addr);

    Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
