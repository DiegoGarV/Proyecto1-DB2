# API para la base de datos

# pip install fastapi uvicorn neo4j

from fastapi import FastAPI
from neo4j import GraphDatabase

app = FastAPI()

# Conexión a Neo4J
try:
    db = GraphDatabase.driver("neo4j+s://7adc3091.databases.neo4j.io", auth=("neo4j", "5kysW0wqPUqzVEBzo7SdkQs9bEg62NgEfYfwITRmP9E"))
except Exception as e:
    print(f"Error conectando a Neo4J: {e}")

@app.get("/users")
def get_users():
    try:
        with db.session() as session:
            result = session.run("MATCH (u:Usuario) RETURN u.id AS id, u.nombre_usuario AS name, u.correo AS correo, u.contraseña AS contrasena, u.cursos_actuales AS cursos_actuales, u.cursos_llevados AS cursos_llevados, u.beca AS beca")
            users = [{"id": record["id"], "name": record["name"], "correo": record["correo"], "contrasena": record["contrasena"], "cursos_actuales": record["cursos_actuales"], "cursos_llevados": record["cursos_llevados"], "beca": record["beca"]} for record in result]
        return {"usuarios": users}
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/availablePosts")
def get_available_posts():
    try:
        with db.session() as session:
            result = session.run("MATCH (p:Post) WHERE p.status = 'TRUE' RETURN p.id AS id, p.título AS titulo, p.descripción AS descripcion, p.fecha AS fecha, p.adjuntos AS archivos, p.calificación AS calificacion")
            posts = [{"id": record["id"], "titulo": record["titulo"], "descripcion": record["descripcion"], "fecha": record["fecha"], "archivos": record["archivos"], "calificacion": record["calificacion"]} for record in result]
        return {"availablePosts": posts}
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/hiddenPosts")
def get_hidden_posts():
    try:
        with db.session() as session:
            result = session.run("MATCH (p:Post) WHERE p.status = 'FALSE' RETURN p.id AS id, p.título AS titulo, p.descripción AS descripcion, p.fecha AS fecha, p.adjuntos AS archivos, p.calificación AS calificacion")
            posts = [{"id": record["id"], "titulo": record["titulo"], "descripcion": record["descripcion"], "fecha": record["fecha"], "archivos": record["archivos"], "calificacion": record["calificacion"]} for record in result]
        return {"hiddenPosts": posts}
    except Exception as e:
        return {"error": str(e)}    

@app.get("/getPostComments/{post_id}")
def get_post_comments(post_id: int):
    try:
        with db.session() as session:
            result = session.run("""
                MATCH (p:Post)<-[:PERTENECE_A_POST]-(c:Comentario)
                WHERE p.id = $post_id AND c.status = 'TRUE'
                RETURN c.id AS id, c.contenido AS contenido, c.fecha AS fecha, c.likes AS likes
            """, post_id=post_id)
            
            comments = [{"id": record["id"], "contenido": record["contenido"], "fecha": record["fecha"], "likes": record["likes"]} for record in result]
        return {"comments": comments}
    except Exception as e:
        return {"error": str(e)}

@app.get("/getCommentReplies/{comment_id}")
def get_comment_replies(comment_id: int):
    try:
        with db.session() as session:
            result = session.run("""
                MATCH (c:Comentario)-[:TIENE_RESPUESTA]->(r:Comentario)
                WHERE c.id = $comment_id AND r.status = 'TRUE'
                RETURN r.id AS id, r.contenido AS contenido, r.fecha AS fecha, r.likes AS likes
            """, comment_id=comment_id)
            
            replies = [{"id": record["id"], "contenido": record["contenido"], "fecha": record["fecha"], "likes": record["likes"]} for record in result]
        return {"replies": replies}
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/clases")
def get_clases():
    try:
        with db.session() as session:
            result = session.run("MATCH (c:Clase) RETURN c.id AS id, c.nombre AS nombre, c.facultad AS facultad, c.catedráticos AS catedraticos, c.sección AS secciones")
            clases = [{"id": record["id"], "nombre": record["nombre"], "facultad": record["facultad"], "catedraticos": record["catedraticos"], "secciones": record["secciones"]} for record in result]
        return {"clases": clases}
    except Exception as e:
        return {"error": str(e)}

@app.get("/comunidades")
def get_comunidades():
    try:
        with db.session() as session:
            result = session.run("MATCH (c:Comunidades) RETURN c.id AS id, c.título AS titulo, c.descripción AS descripcion, c.fecha AS fecha_creacion")
            comunidades = [{"id": record["id"], "titulo": record["titulo"], "descripcion": record["descripcion"], "fecha_creacion": record["fecha_creacion"]} for record in result]
        return {"comunidades": comunidades}
    except Exception as e:
        return {"error": str(e)}

@app.get("/recompensas")
def get_recompensas():
    try:
        with db.session() as session:
            result = session.run("MATCH (r:Recompensa) RETURN r.id AS id, r.tipo AS tipo, r.cantidad_puntos AS cantidad_puntos, r.caducidad AS caducidad, r.fecha_lanzamiento AS lanzamiento, r.descripcion AS descripcion")
            recompensas = [{"id": record["id"], "tipo": record["tipo"], "cantidad_puntos": record["cantidad_puntos"], "lanzamiento": record["lanzamiento"], "caducidad": record["caducidad"], "descripcion": record["descripcion"]} for record in result]
        return {"recompensas": recompensas}
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/getFollowed/{user_id}")
def get_followed(user_id: int):
    try:
        with db.session() as session:
            result = session.run("""
                MATCH (u:Usuario)-[:SIGUE]->(f:Usuario)
                WHERE u.id = $user_id
                RETURN f.id AS id, f.nombre_usuario AS name, f.correo AS correo, f.cursos_actuales AS cursos_actuales, f.cursos_llevados AS cursos_llevados
            """, user_id=user_id)
            followed = [{"id": record["id"], "name": record["name"], "correo": record["correo"], "cursos_actuales": record["cursos_actuales"], "cursos_llevados": record["cursos_llevados"]} for record in result]
        return {"followed": followed}
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/getFollowers/{user_id}")
def get_followers(user_id: int):
    try:
        with db.session() as session:
            result = session.run("""
                MATCH (u:Usuario)<-[:SIGUE]-(f:Usuario)
                WHERE u.id = $user_id
                RETURN f.id AS id, f.nombre_usuario AS name, f.correo AS correo, f.cursos_actuales AS cursos_actuales, f.cursos_llevados AS cursos_llevados
            """, user_id=user_id)
            followers = [{"id": record["id"], "name": record["name"], "correo": record["correo"], "cursos_actuales": record["cursos_actuales"], "cursos_llevados": record["cursos_llevados"]} for record in result]
        return {"followers": followers}
    except Exception as e:
        return {"error": str(e)}


# Comando para ejecutar API: python -m uvicorn API:app --reload

