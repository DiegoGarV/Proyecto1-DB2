# API para la base de datos

# pip install fastapi uvicorn neo4j

from fastapi import FastAPI
from neo4j import GraphDatabase
from datetime import datetime
from uuid import uuid4
from typing import List, Optional

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
    
@app.get("/postsInClass/{class_id}")
def get_postsInClass(class_id: int):
    try:
        with db.session() as session:
            result = session.run("""
                MATCH (p:Post)-[r:PERTENECE_CLASE]->(c:Clase)
                WHERE c.id = $class_id AND p.status = 'TRUE' 
                RETURN p.id AS id, p.título AS titulo, p.descripción AS descripcion, p.fecha AS fecha, p.adjuntos AS archivos, p.calificación AS calificacion, r.tipo AS examen
            """, class_id=class_id)
            posts = [{"id": record["id"], "titulo": record["titulo"], "descripcion": record["descripcion"], "fecha": record["fecha"], "archivos": record["archivos"], "calificacion": record["calificacion"], "examen": record["examen"]} for record in result]
        return {"posts": posts}
    except Exception as e:
        return {"error": str(e)}
    
@app.get("/postsInCommunity/{community_id}")
def get_postsInCommunity(community_id: int):
    try:
        with db.session() as session:
            result = session.run("""
                MATCH (p:Post)-[:PERTENECE_COMUNIDAD]->(c:Comunidades)
                WHERE c.id = $community_id AND p.status = 'TRUE' 
                RETURN p.id AS id, p.título AS titulo, p.descripción AS descripcion, p.fecha AS fecha, p.adjuntos AS archivos, p.calificación AS calificacion
            """, community_id=community_id)
            posts = [{"id": record["id"], "titulo": record["titulo"], "descripcion": record["descripcion"], "fecha": record["fecha"], "archivos": record["archivos"], "calificacion": record["calificacion"]} for record in result]
        return {"posts": posts}
    except Exception as e:
        return {"error": str(e)}
    
@app.post("/create_user")
def create_user(cursos_llevados: List[str], cursos_actuales: List[str], correo: str, nombre_usuario: str, contraseña: str, beca: bool):
    try:

        user_id = int(str(uuid4().int)[:8], 16)

        with db.session() as session:
            session.run("MATCH (counter:IDCounter) SET counter.id = $user_id", user_id=user_id)
        query = """
        CREATE (u:Usuario {
            id: $user_id,
            cursos_llevados: $cursos_llevados,
            cursos_actuales: $cursos_actuales,
            correo: $correo,
            nombre_usuario: $nombre_usuario,
            contraseña: $contraseña,
            beca: $beca
        })
        RETURN u
        """
        with db.session() as session:
            result = session.run(query, 
                                 user_id=user_id, 
                                 cursos_llevados=cursos_llevados, 
                                 cursos_actuales=cursos_actuales, 
                                 correo=correo, 
                                 nombre_usuario=nombre_usuario, 
                                 contraseña=contraseña, 
                                 beca=beca)
            created_user = result.single()

        return {
            "mensaje": "Usuario creado exitosamente",
            "usuario": {
                "id": created_user["u"]["id"],
                "cursos_llevados": created_user["u"]["cursos_llevados"],
                "cursos_actuales": created_user["u"]["cursos_actuales"],
                "correo": created_user["u"]["correo"],
                "nombre_usuario": created_user["u"]["nombre_usuario"],
                "beca": created_user["u"]["beca"]
            }
        }

    except Exception as e:
        return {"error": str(e)}
    
@app.post("/create_post")
def create_post(user_id: int, titulo: str, descripcion: str, adjuntos: Optional[List[str]] = [], clase: Optional[str] = None, temas: Optional[List[str]] = [], examen: Optional[bool] = False, comunidad: Optional[int] = 0):
    try:
        post_id = int(str(uuid4().int)[:8], 16)

        fecha = datetime.utcnow().isoformat()

        tipo = "relevante" if adjuntos else "otro"

        query = """
        CREATE (p:Post {
            id: $post_id,
            fecha: $fecha,
            titulo: $titulo,
            descripcion: $descripcion,
            adjuntos: $adjuntos,
            calificacion: 0,
            status: TRUE
        })
        WITH p
        MATCH (u:Usuario {id: $user_id})
        CREATE (u)-[r:PUBLICÓ]->(p)
        SET r.fecha = $fecha, r.dispositivo = 'celular', r.tipo = $tipo
        """
        
        with db.session() as session:
            result = session.run(query, 
                                 post_id=post_id, 
                                 fecha=fecha, 
                                 titulo=titulo, 
                                 descripcion=descripcion, 
                                 adjuntos=adjuntos, 
                                 user_id=user_id, 
                                 tipo=tipo)

            created_post = result.single()

        if clase:
            clase_normalizada = clase.strip().lower()
            clase_query = """
            MATCH (c:Clase)
            WHERE toLower(c.nombre) = $clase_normalizada
            RETURN c
            """
            with db.session() as session:
                clase_result = session.run(clase_query, clase_normalizada=clase_normalizada)
                clase_node = clase_result.single()

            if clase_node:
                relacion_query = """
                MATCH (p:Post {id: $post_id}), (c:Clase {id: $clase_id})
                CREATE (p)-[r:PERTENECE_CLASE]->(c)
                SET r.fecha = Datetime($fecha), r.temas = $temas, r.examen = $examen
                """
                with db.session() as session:
                    session.run(relacion_query, 
                                post_id=post_id, 
                                clase_id=clase_node["c"]["id"], 
                                fecha=fecha, 
                                temas=temas, 
                                examen=examen)
            else:
                return {"error": "La clase no se encontró."}
            
        if comunidad:
            relacion_query = """
            MATCH (p:Post {id: $post_id}), (c:Comunidades {id: $comunidad})
            CREATE (p)-[r:PERTENECE_COMUNIDAD]->(c)
            SET r.existe = TRUE, r.forma_parte = TRUE, r.está = TRUE
            """
            with db.session() as session:
                session.run(relacion_query, 
                    post_id=post_id, 
                    comunidad=comunidad)

        return {
            "mensaje": "Post creado exitosamente",
            "post": {
                "id": created_post["p"]["id"],
                "fecha": created_post["p"]["fecha"],
                "titulo": created_post["p"]["titulo"],
                "descripcion": created_post["p"]["descripcion"],
                "adjuntos": created_post["p"]["adjuntos"],
                "calificacion": created_post["p"]["calificacion"],
                "status": created_post["p"]["status"]
            }
        }

    except Exception as e:
        return {"error": str(e)}
    
@app.post("/create_comunidad")
def create_comunidad(user_id: int, nombre: str, descripcion: str, visibilidad: bool):
    try:
        comunidad_id = int(str(uuid4().int)[:8], 16)
        
        fecha_creacion = datetime.utcnow().isoformat()
        
        query = """
        CREATE (c:Comunidades {
            id: $comunidad_id,
            nombre: $nombre,
            descripcion: $descripcion,
            fecha_creacion: $fecha_creacion,
            visibilidad: $visibilidad,
            status: 'TRUE'
        })
        WITH c
        MATCH (u:Usuario {id: $user_id})
        CREATE (u)-[r1:CREÓ_COMUNIDAD]->(c)
        SET r1.fecha = $fecha_creacion, r1.enfoque = $descripcion, r1.primero_usuarios = $user_id
        CREATE (u)-[r2:PERTENECE_A_COMUNIDAD]->(c)
        SET r2.fecha = $fecha_creacion, r2.rol = 'admin', r2.estado = 'activo'
        RETURN c
        """
        
        with db.session() as session:
            result = session.run(query, 
                                 comunidad_id=comunidad_id, 
                                 nombre=nombre, 
                                 descripcion=descripcion, 
                                 fecha_creacion=fecha_creacion, 
                                 visibilidad=visibilidad, 
                                 user_id=user_id)
            
            created_comunidad = result.single()

        return {
            "mensaje": "Comunidad creada exitosamente",
            "comunidad": {
                "id": created_comunidad["c"]["id"],
                "nombre": created_comunidad["c"]["nombre"],
                "descripcion": created_comunidad["c"]["descripcion"],
                "fecha_creacion": created_comunidad["c"]["fecha_creacion"],
                "visibilidad": created_comunidad["c"]["visibilidad"],
                "status": created_comunidad["c"]["status"]
            }
        }

    except Exception as e:
        return {"error": str(e)}
    
@app.post("/create_clase")
def create_clase(nombre: str, facultad: str, catedraticos: List[str], seccion: List[str]):
    try:
        # Generar un id único automático para la clase
        clase_id = int(str(uuid4().int)[:8], 16)

        # Query para crear el nodo Clase
        query = """
        CREATE (c:Clase {
            id: $clase_id,
            nombre: $nombre,
            facultad: $facultad,
            catedraticos: $catedraticos,
            seccion: $seccion
        })
        RETURN c
        """

        # Ejecutar el query
        with db.session() as session:
            result = session.run(query, 
                                 clase_id=clase_id, 
                                 nombre=nombre, 
                                 facultad=facultad, 
                                 catedraticos=catedraticos, 
                                 seccion=seccion)

            created_clase = result.single()

        return {
            "mensaje": "Clase creada exitosamente",
            "clase": {
                "id": created_clase["c"]["id"],
                "nombre": created_clase["c"]["nombre"],
                "facultad": created_clase["c"]["facultad"],
                "catedraticos": created_clase["c"]["catedraticos"],
                "seccion": created_clase["c"]["seccion"]
            }
        }

    except Exception as e:
        return {"error": str(e)}
    
@app.post("/create_recompensa")
def create_recompensa(tipo: str, cantidad_puntos: int, caducidad: str, descripcion: str):
    try:
        recompensa_id = int(str(uuid4().int)[:8], 16)

        fecha_lanzamiento = datetime.utcnow().isoformat()

        query = """
        CREATE (r:Recompensa {
            id: $recompensa_id,
            tipo: $tipo,
            cantidad_puntos: $cantidad_puntos,
            caducidad: date($caducidad),
            fecha_lanzamiento: datetime($fecha_lanzamiento),
            descripcion: $descripcion
        })
        RETURN r
        """

        # Ejecutar el query
        with db.session() as session:
            result = session.run(query, 
                                 recompensa_id=recompensa_id, 
                                 tipo=tipo, 
                                 cantidad_puntos=cantidad_puntos, 
                                 caducidad=caducidad, 
                                 fecha_lanzamiento=fecha_lanzamiento, 
                                 descripcion=descripcion)

            created_recompensa = result.single()

        return {
            "mensaje": "Recompensa creada exitosamente",
            "recompensa": {
                "id": created_recompensa["r"]["id"],
                "tipo": created_recompensa["r"]["tipo"],
                "cantidad_puntos": created_recompensa["r"]["cantidad_puntos"],
                "caducidad": created_recompensa["r"]["caducidad"],
                "fecha_lanzamiento": created_recompensa["r"]["fecha_lanzamiento"],
                "descripcion": created_recompensa["r"]["descripcion"]
            }
        }

    except Exception as e:
        return {"error": str(e)}
    
@app.post("/create_comentario")
def create_comentario(user_id: int, post_id: int, contenido: str):
    try:
        comentario_id = int(str(uuid4().int)[:8], 16)
        fecha = datetime.utcnow().isoformat()
        longitud = len(contenido)

        # Obtener el orden_comentario actual para el post
        orden_query = """
        MATCH (:Post {id: $post_id})<-[:PERTENECE_POST]-(c:Comentario)
        RETURN COUNT(c) AS total_comentarios
        """
        with db.session() as session:
            orden_result = session.run(orden_query, post_id=post_id).single()
            orden_comentario = orden_result["total_comentarios"] + 1 if orden_result and "total_comentarios" in orden_result else 1

        # Crear el nodo Comentario y Post con sus relaciones
        query = """
        MATCH (u:Usuario {id: $user_id}), (p:Post {id: $post_id})
        CREATE (c:Comentario:Post {
            id: $comentario_id,
            contenido: $contenido,
            likes: 0,
            fecha: datetime($fecha),
            status: TRUE
        })
        CREATE (u)-[r:CREÓ_COMENTARIO]->(c)
        SET r.fecha = $fecha, r.editado = FALSE, r.longitud = $longitud

        CREATE (c)-[r2:PERTENECE_POST]->(p)
        SET r2.tipo_comentario = 'apoyo', r2.orden_comentario = $orden_comentario, r2.ultima_interacción = $fecha
        RETURN c
        """

        with db.session() as session:
            result = session.run(query, 
                                 user_id=user_id, 
                                 post_id=post_id, 
                                 comentario_id=comentario_id, 
                                 contenido=contenido, 
                                 fecha=fecha, 
                                 longitud=longitud, 
                                 orden_comentario=orden_comentario)

            created_comentario = result.single()

        # Validar si se creó el nodo
        if not created_comentario:
            return {"error": "No se pudo crear el comentario. Verifica que el usuario y el post existan."}

        return {
            "mensaje": "Comentario creado exitosamente",
            "comentario": {
                "id": created_comentario["c"]["id"],
                "contenido": created_comentario["c"]["contenido"],
                "likes": created_comentario["c"]["likes"],
                "fecha": created_comentario["c"]["fecha"],
                "status": created_comentario["c"]["status"]
            }
        }

    except Exception as e:
        return {"error": str(e)}
    
@app.post("/create_reply")
def create_reply(user_id: int, comentario_post_id: int, contenido: str):
    try:
        comentario_id = int(str(uuid4().int)[:8], 16)
        fecha = datetime.utcnow().isoformat()
        longitud = len(contenido)

        query = """
        MATCH (u:Usuario {id: $user_id}), (cp:Comentario:Post {id: $comentario_post_id})
        CREATE (c:Comentario {
            id: $comentario_id,
            contenido: $contenido,
            likes: 0,
            fecha: datetime($fecha),
            status: TRUE
        })
        CREATE (u)-[r:CREÓ_COMENTARIO]->(c)
        SET r.fecha = $fecha, r.editado = FALSE, r.longitud = $longitud

        CREATE (cp)-[r2:TIENE_RESPUESTA]->(c)
        SET r2.fecha_respuesta = $fecha, r2.like_autor = FALSE, r2.ratio = FALSE
        RETURN c
        """

        with db.session() as session:
            result = session.run(query, 
                                 user_id=user_id, 
                                 comentario_post_id=comentario_post_id, 
                                 comentario_id=comentario_id, 
                                 contenido=contenido, 
                                 fecha=fecha, 
                                 longitud=longitud)

            created_reply = result.single()

        if not created_reply:
            return {"error": "No se pudo crear la respuesta. Verifica que el usuario y el comentario existan."}

        return {
            "mensaje": "Respuesta creada exitosamente",
            "comentario": {
                "id": created_reply["c"]["id"],
                "contenido": created_reply["c"]["contenido"],
                "likes": created_reply["c"]["likes"],
                "fecha": created_reply["c"]["fecha"],
                "status": created_reply["c"]["status"]
            }
        }

    except Exception as e:
        return {"error": str(e)}
    
@app.post("/claim_reward/{user_id}/{reward_id}")
def claim_reward(user_id: int, reward_id: int):
    try:
        with db.session() as session:

            query = """
            MATCH (u:Usuario {id: $user_id}), (r:Recompensa {id: $reward_id})
            RETURN u.puntos AS user_points, r.cantidad_puntos AS reward_points
            """
            result = session.run(query, user_id=user_id, reward_id=reward_id)
            record = result.single()

            if not record:
                return {"error": "Usuario o recompensa no encontrados"}

            user_points = record["user_points"]
            reward_points = record["reward_points"]

            if user_points is None or reward_points is None:
                return {"error": "Datos incompletos en el usuario o la recompensa"}

            if user_points < reward_points:
                return {"error": "No tienes suficientes puntos para reclamar esta recompensa"}

            update_query = """
            MATCH (u:Usuario {id: $user_id})
            SET u.puntos = u.puntos - $reward_points
            """
            session.run(update_query, user_id=user_id, reward_points=reward_points)

            create_relation_query = """
            MATCH (u:Usuario {id: $user_id}), (r:Recompensa {id: $reward_id})
            CREATE (u)-[:RECLAMÓ_RECOMPENSA {
                fecha: datetime($fecha),
                estado_reclamo: "aceptado",
                puntos_reclamo: $reward_points
            }]->(r)
            """
            session.run(create_relation_query, 
                        user_id=user_id, 
                        reward_id=reward_id, 
                        fecha=datetime.utcnow().isoformat(), 
                        reward_points=reward_points)

        return {"mensaje": "Recompensa reclamada con éxito", "puntos_restantes": user_points - reward_points}

    except Exception as e:
        return {"error": str(e)}


# Comando para ejecutar API: python -m uvicorn API:app --reload

