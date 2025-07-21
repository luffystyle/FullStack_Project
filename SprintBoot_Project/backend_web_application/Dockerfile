FROM openjdk:17-jdk-slim

WORKDIR /app

# Copiar todo el proyecto
COPY . .

# Dar permisos de ejecución y construir la aplicación
RUN chmod +x ./mvnw && ./mvnw clean package -DskipTests

# Exponer el puerto
EXPOSE 8080

# Ejecutar la aplicación
CMD ["java", "-jar", "target/customer-0.0.1-SNAPSHOT.jar"]