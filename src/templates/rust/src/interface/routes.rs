use axum::{
    extract::Extension,
    routing::{get, post},
    Json, Router,
};
use serde::Deserialize;
use std::sync::Arc;

use crate::application::user_service::UserService;
use crate::domain::user::User;

#[derive(Deserialize)]
struct CreateUserRequest {
    name: String,
    email: String,
}

pub fn create_routes<T: Send + Sync + 'static>(user_service: Arc<UserService<T>>) -> Router
where
    T: crate::infrastructure::repository::UserRepository,
{
    Router::new()
        .route("/users", get(get_users::<T>))
        .route("/users", post(create_user::<T>))
        .layer(Extension(user_service))
}

async fn get_users<T: crate::infrastructure::repository::UserRepository>(
    Extension(user_service): Extension<Arc<UserService<T>>>,
) -> Json<Vec<User>> {
    let users = user_service.list_users().await;
    Json(users)
}

async fn create_user<T: crate::infrastructure::repository::UserRepository>(
    Extension(user_service): Extension<Arc<UserService<T>>>,
    Json(payload): Json<CreateUserRequest>,
) -> Json<User> {
    let user = user_service
        .create_user(payload.name, payload.email)
        .await;
    Json(user)
}
